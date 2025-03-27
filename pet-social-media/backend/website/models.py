from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func
from werkzeug.security import generate_password_hash

######################
#    HELPER TABLES
######################


# Association table for user-to-user follows
follows = db.Table('follows',
    db.Column('follower_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('followed_id', db.Integer, db.ForeignKey('user.id'))
)

# Association table for user-to-pet follows
pet_follows = db.Table('pet_follows',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('pet_id', db.Integer, db.ForeignKey('pet.id'))
)


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True, nullable=False)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)
    user_type = db.Column(db.String(50), nullable=False)  # "User" or "Shelter"
    role = db.Column(db.String(50), default="User")  # "User", "Shelter", or "Admin"
    join_date = db.Column(db.DateTime(timezone=True), default=func.now())

    # Optional Fields
    full_name = db.Column(db.String(150), nullable=True)
    profile_picture = db.Column(db.String(255), nullable=True)  # Store URL
    bio = db.Column(db.Text, nullable=True)
    location = db.Column(db.String(255), nullable=True)

    pets = db.relationship('Pet', backref='owner', lazy=True)

    followed_users = db.relationship(
        'User',
        secondary=follows,
        primaryjoin=(follows.c.follower_id == id),
        secondaryjoin=(follows.c.followed_id == id),
        backref='followers'
    )

    followed_pets = db.relationship(
        'Pet',
        secondary=pet_follows,
        backref='followers'
    )


class Pet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    username = db.Column(db.String(150), unique=True, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    species = db.Column(db.String(100), nullable=True)  
    breed = db.Column(db.String(100), nullable=True)  
    age = db.Column(db.Integer, nullable=True)

    # Optional Fields
    profile_picture = db.Column(db.String(255), nullable=True)
    birthday = db.Column(db.Date, nullable=True)
    gender = db.Column(db.String(20), nullable=True)  # Male, Female, Other
    size = db.Column(db.String(20), nullable=True)  # Small, Medium, Large
    weight = db.Column(db.Float, nullable=True)
    color = db.Column(db.String(50), nullable=True) 

    temperament = db.Column(db.String(255), nullable=True)
    favorite_activities = db.Column(db.String(255), nullable=True)
    likes_dislikes = db.Column(db.Text, nullable=True)
    hobbies = db.Column(db.String(255), nullable=True)

    vaccination_status = db.Column(db.String(50), nullable=True)
    medical_conditions = db.Column(db.Text, nullable=True)
    dietary_preferences = db.Column(db.String(255), nullable=True)
    vet_info = db.Column(db.String(255), nullable=True)
    adoption_status = db.Column(db.String(50), nullable=True)  # Available, Adopted, Fostered

    previous_owners = db.Column(db.Text, nullable=True)  # Store list of previous owner IDs
    lost_status = db.Column(db.Boolean, default=False)  # Mark as lost or found

    location = db.Column(db.String(255), nullable=True)           # City, State, etc.
    about = db.Column(db.Text, nullable=True)                      # Description of pet (bio)
    contact_email = db.Column(db.String(255), nullable=True)       # Contact for adoption
    contact_phone = db.Column(db.String(20), nullable=True)        # Optional: shelter phone
    adoption_posted = db.Column(db.Boolean, default=False)         # Is pet listed for adoption?
    adoption_images = db.Column(db.PickleType, nullable=True)      # List of image URLs
    vaccinated = db.Column(db.Boolean, default=False)              # Vaccination badge


def create_admin():
    """Create an admin user, test users, and test shelters if they do not exist"""

    users_data = [
        {"email": "admin@gmail.com", "username": "admin", "password": "admin123", "user_type": "Admin", "role": "Admin"},
        {"email": "testuser1@gmail.com", "username": "testuser1", "password": "password1", "user_type": "User", "role": "User"},
        {"email": "testuser2@gmail.com", "username": "testuser2", "password": "password2", "user_type": "User", "role": "User"},
        {"email": "testshelter1@gmail.com", "username": "testshelter1", "password": "shelter1", "user_type": "Shelter", "role": "Shelter"},
        {"email": "testshelter2@gmail.com", "username": "testshelter2", "password": "shelter2", "user_type": "Shelter", "role": "Shelter"},
    ]

    created_users = {}

    for user_data in users_data:
        # Check if user already exists by email or username
        if not User.query.filter((User.email == user_data["email"]) | (User.username == user_data["username"])).first():
            hashed_password = generate_password_hash(user_data["password"], method='sha256')
            new_user = User(
                email=user_data["email"], 
                username=user_data["username"], 
                password=hashed_password, 
                user_type=user_data["user_type"], 
                role=user_data["role"]
            )
            db.session.add(new_user)
            db.session.commit()
            created_users[user_data["username"]] = new_user

    # Assign unique pets to each test user (now checking by pet username instead of name)
    pet_data = {
        "testuser1": [
            {"name": "Rex", "username": "rex123", "species": "Dog", "breed": "German Shepherd", "age": 4},
            {"name": "Whiskers", "username": "whiskers321", "species": "Cat", "breed": "Maine Coon", "age": 3},
        ],
        "testuser2": [
            {"name": "Bella", "username": "bella_woof", "species": "Dog", "breed": "Labrador Retriever", "age": 2},
            {"name": "Charlie", "username": "charlie_purr", "species": "Cat", "breed": "Persian", "age": 1},
        ]
    }

    for username, pets in pet_data.items():
        user = created_users.get(username)
        if user:
            for pet_info in pets:
                # Ensure the pet doesn’t already exist by checking unique pet username
                if not Pet.query.filter_by(username=pet_info["username"]).first():
                    new_pet = Pet(
                        name=pet_info["name"], 
                        username=pet_info["username"], 
                        species=pet_info["species"], 
                        breed=pet_info["breed"], 
                        age=pet_info["age"], 
                        owner_id=user.id
                    )
                    db.session.add(new_pet)
                    db.session.commit()

    print("Admin, test users, test shelters, and their pets created successfully!")

class Post(db.Model):
    """Represents a user-created post that can be tagged with pets."""
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  # Post author
    caption = db.Column(db.Text, nullable=True)  # Caption text
    main_pet_id = db.Column(db.Integer, db.ForeignKey('pet.id'), nullable=True)  # Primary tagged pet
    created_at = db.Column(db.DateTime(timezone=True), default=func.now())

    user = db.relationship('User', backref='posts')  # Relationship to User
    main_pet = db.relationship('Pet', foreign_keys=[main_pet_id], backref='main_posts')  # Relationship to primary pet

    # Images and tags are linked via separate tables
    images = db.relationship('PostImage', backref='post', cascade='all, delete-orphan')
    tags = db.relationship('PostTag', backref='post', cascade='all, delete-orphan')
    tagged_pets = db.relationship(
        'Pet',
        secondary='post_tag',  # refers to the PostTag table
        primaryjoin='Post.id==PostTag.post_id',
        secondaryjoin='Pet.id==PostTag.pet_id',
        viewonly=True  # optional: avoids automatic writes through this relationship
    )

class PostImage(db.Model):
    """Handles multiple images for a post."""
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id', ondelete="CASCADE"), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)  # Store image file URL


class PostTag(db.Model):
    """Allows tagging additional pets in a post."""
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id', ondelete="CASCADE"), nullable=False)
    pet_id = db.Column(db.Integer, db.ForeignKey('pet.id', ondelete="CASCADE"), nullable=False)

    pet = db.relationship('Pet')  # Additional pets linked

class PostLike(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete="CASCADE"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id', ondelete="CASCADE"), nullable=False)
    timestamp = db.Column(db.DateTime(timezone=True), default=func.now())

    user = db.relationship('User', backref='liked_posts')
    post = db.relationship('Post', backref='post_likes')  # ✅ Changed from 'likes' to 'post_likes'


class PostComment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete="CASCADE"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id', ondelete="CASCADE"), nullable=False)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime(timezone=True), default=func.now())

    user = db.relationship('User', backref='post_comments')
    post = db.relationship('Post', backref='post_comments')  # ✅ Changed from 'comments' to 'post_comments'

