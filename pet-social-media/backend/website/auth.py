from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, login_required, logout_user, current_user
from .models import User
from . import db
from flasgger import swag_from

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['POST'])
@swag_from({
    'tags': ['Authentication'],
    'summary': 'User Login',
    'description': 'Login with either email or username and password.',
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'schema': {
                'type': 'object',
                'properties': {
                    'identifier': {'type': 'string'},
                    'password': {'type': 'string'}
                },
                'required': ['identifier', 'password']
            }
        }
    ],
    'responses': {
        200: {'description': 'Login successful'},
        401: {'description': 'Invalid credentials'}
    }
})
def login():
    data = request.get_json()
    identifier = data.get('identifier')  # Can be email or username
    password = data.get('password')

    user = User.query.filter((User.email == identifier) | (User.username == identifier)).first()
    if user and check_password_hash(user.password, password):
        login_user(user, remember=True)
        return jsonify({'message': 'Login successful', 'user_id': user.id, 'role': user.role}), 200
    return jsonify({'error': 'Invalid username/email or password'}), 401

@auth.route('/sign-up', methods=['POST'])
@swag_from({
    'tags': ['Authentication'],
    'summary': 'User Sign Up',
    'description': 'Create a new user or shelter account.',
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'schema': {
                'type': 'object',
                'properties': {
                    'email': {'type': 'string'},
                    'username': {'type': 'string'},
                    'password1': {'type': 'string'},
                    'password2': {'type': 'string'},
                    'user_type': {'type': 'string', 'enum': ['User', 'Shelter']}
                },
                'required': ['email', 'username', 'password1', 'password2', 'user_type']
            }
        }
    ],
    'responses': {
        201: {'description': 'Account created successfully'},
        400: {'description': 'Validation error'}
    }
})
def sign_up():
    data = request.get_json()

    email = data.get('email')
    username = data.get('username')
    password1 = data.get('password1')
    password2 = data.get('password2')
    user_type = data.get('user_type')

    if not user_type or user_type not in ['User', 'Shelter']:
        return jsonify({'error': 'User type must be either "User" or "Shelter"'}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already exists'}), 400
    if User.query.filter_by(username=username).first():
        return jsonify({'error': 'Username already taken'}), 400
    if len(username) < 3:
        return jsonify({'error': 'Username must be at least 3 characters'}), 400
    if password1 != password2:
        return jsonify({'error': 'Passwords do not match'}), 400
    if len(password1) < 7:
        return jsonify({'error': 'Password must be at least 7 characters'}), 400

    hashed_password = generate_password_hash(password1, method='sha256')
    new_user = User(email=email, username=username, password=hashed_password, user_type=user_type)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Account created successfully', 'user_id': new_user.id}), 201