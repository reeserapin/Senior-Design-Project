from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from .models import Pet, User, Post, PostImage, PostTag, PostLike, PostComment
from . import db
from flasgger import swag_from
from datetime import datetime
import random 

views = Blueprint('views', __name__)

@views.route('/', methods=['GET'])
@swag_from({
    'tags': ['General'],
    'summary': 'API Home',
    'description': 'Returns a welcome message.',
    'responses': {200: {'description': 'Welcome message'}}
})
def home():
    return jsonify({'message': 'Welcome to the Pet Social Media API'}), 200

##############
# CREATE PET
##############

@views.route('/create_pet', methods=['POST'])
@login_required
@swag_from({
    'tags': ['Pets'],
    'summary': 'Create a Pet Account',
    'description': 'Users can create pet accounts with a unique username.',
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'schema': {
                'type': 'object',
                'properties': {
                    'name': {'type': 'string'},
                    'username': {'type': 'string'},
                    'species': {'type': 'string'},
                    'breed': {'type': 'string'},
                    'age': {'type': 'integer'}
                },
                'required': ['name', 'username', 'species']
            }
        }
    ],
    'responses': {
        201: {'description': 'Pet account created'},
        400: {'description': 'Validation error'}
    }
})
def create_pet():
    data = request.get_json()
    name = data.get('name')
    username = data.get('username') 
    species = data.get('species')
    breed = data.get('breed')
    age = data.get('age')

    if not name or not username or not species:
        return jsonify({'error': 'Pet name, username, and species are required'}), 400

    # Check if pet username already exists
    if Pet.query.filter_by(username=username).first():
        return jsonify({'error': 'Pet username already taken'}), 400

    new_pet = Pet(name=name, username=username, species=species, breed=breed, age=age, owner_id=current_user.id)
    db.session.add(new_pet)
    db.session.commit()

    return jsonify({'message': 'Pet account created', 'pet_id': new_pet.id, 'username': new_pet.username}), 201

################
# GET MY PETS
#################

@views.route('/my_pets', methods=['GET'])
@login_required
@swag_from({
    'tags': ['Pets'],
    'summary': 'Get User’s Pets',
    'description': 'Retrieve all pets linked to the logged-in user.',
    'responses': {200: {'description': 'List of pets'}}
})
def my_pets():
    pets = Pet.query.filter_by(owner_id=current_user.id).all()
    pets_data = [{'id': pet.id, 'name': pet.name, 'species': pet.species, 'breed': pet.breed, 'age': pet.age} for pet in pets]
    return jsonify({'pets': pets_data}), 200

#######################
# GENERATE TRANSFER OTP
#######################

@views.route('/generate_transfer_otp', methods=['POST'])
@login_required
@swag_from({
    'tags': ['Pets'],
    'summary': 'Generate OTP for Pet Transfer',
    'description': 'Generates a one-time password (OTP) for transferring pet ownership. Only the current owner can generate the OTP.',
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'schema': {
                'type': 'object',
                'properties': {
                    'pet_username': {'type': 'string'}
                },
                'required': ['pet_username']
            }
        }
    ],
    'responses': {
        200: {
            'description': 'OTP generated successfully',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'},
                    'otp': {'type': 'string'},
                    'pet_username': {'type': 'string'}
                }
            }
        },
        404: {'description': 'Pet not found or unauthorized'},
        403: {'description': 'You do not own this pet'}
    }
})
def generate_transfer_otp():
    """Generates an OTP to transfer pet ownership."""
    data = request.get_json()
    pet_username = data.get('pet_username')

    pet = Pet.query.filter_by(username=pet_username, owner_id=current_user.id).first()
    if not pet:
        return jsonify({'error': 'Pet not found or you do not own this pet'}), 404

    # Generate 6-digit OTP
    pet.otp = str(random.randint(100000, 999999))
    db.session.commit()

    return jsonify({'message': 'OTP generated successfully', 'otp': pet.otp, 'pet_username': pet.username}), 200


#############
# CLAIM PET
#############

@views.route('/claim_pet_transfer', methods=['POST'])
@login_required
@swag_from({
    'tags': ['Pets'],
    'summary': 'Claim Pet Transfer',
    'description': 'Allows a user to claim a pet by entering the correct OTP.',
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'schema': {
                'type': 'object',
                'properties': {
                    'pet_username': {'type': 'string'},
                    'otp': {'type': 'string'}
                },
                'required': ['pet_username', 'otp']
            }
        }
    ],
    'responses': {
        200: {
            'description': 'Pet ownership transferred successfully',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        },
        400: {'description': 'Invalid OTP'},
        404: {'description': 'Pet not found'}
    }
})
def claim_pet_transfer():
    """Allows a user to claim a pet by entering the correct OTP."""
    data = request.get_json()
    pet_username = data.get('pet_username')
    otp = data.get('otp')

    pet = Pet.query.filter_by(username=pet_username).first()
    if not pet:
        return jsonify({'error': 'Pet not found'}), 404

    if pet.otp != otp:
        return jsonify({'error': 'Invalid OTP'}), 400

    # Transfer pet ownership
    pet.owner_id = current_user.id
    pet.otp = None  # Clear OTP after transfer
    db.session.commit()

    return jsonify({'message': f'Pet {pet.name} transferred to {current_user.username} successfully'}), 200

##############
# UPDATE PET
##############

from datetime import datetime

@views.route('/update_pet/<string:pet_username>', methods=['PUT'])
@login_required
@swag_from({
    'tags': ['Pets'],
    'summary': 'Update Pet Information',
    'description': 'Allows the owner to update their pet’s profile details, excluding the pet username.',
    'parameters': [
        {
            'name': 'pet_username',
            'in': 'path',
            'type': 'string',
            'required': True,
            'description': 'Unique username of the pet to update'
        },
        {
            'name': 'body',
            'in': 'body',
            'schema': {
                'type': 'object',
                'properties': {
                    'name': {'type': 'string'},
                    'profile_picture': {'type': 'string'},
                    'birthday': {'type': 'string', 'format': 'date'},
                    'gender': {'type': 'string'},
                    'size': {'type': 'string'},
                    'weight': {'type': 'number'},
                    'temperament': {'type': 'string'},
                    'favorite_activities': {'type': 'string'},
                    'likes_dislikes': {'type': 'string'},
                    'hobbies': {'type': 'string'},
                    'vaccination_status': {'type': 'string'},
                    'medical_conditions': {'type': 'string'},
                    'dietary_preferences': {'type': 'string'},
                    'vet_info': {'type': 'string'},
                    'adoption_status': {'type': 'string'},
                    'lost_status': {'type': 'boolean'}
                }
            }
        }
    ],
    'responses': {
        200: {'description': 'Pet updated successfully'},
        400: {'description': 'Invalid request'},
        403: {'description': 'Unauthorized: You do not own this pet'},
        404: {'description': 'Pet not found'}
    }
})
def update_pet(pet_username):
    """Allows pet owners to update pet information."""
    pet = Pet.query.filter_by(username=pet_username, owner_id=current_user.id).first()
    if not pet:
        return jsonify({'error': 'Pet not found or unauthorized'}), 404

    data = request.get_json()

    for key, value in data.items():
        if hasattr(pet, key) and key != "username":  # Prevent username updates
            if key == "birthday" and isinstance(value, str):
                try:
                    value = datetime.strptime(value, "%Y-%m-%d").date()
                except ValueError:
                    return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD'}), 400

            if key == "weight":
                try:
                    value = float(value) if value else None
                except ValueError:
                    return jsonify({'error': 'Invalid weight. Must be a number'}), 400

            setattr(pet, key, value)

    db.session.commit()
    return jsonify({'message': 'Pet updated successfully'}), 200


##############
# CREATE POST
##############
@views.route('/create_post', methods=['POST'])
@login_required
@swag_from({
    'tags': ['Posts'],
    'summary': 'Create a Post',
    'description': 'Allows a user to create a post with images and pet tags. The post appears on the user’s profile and any tagged pet’s profile.',
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'caption': {'type': 'string', 'description': 'The caption of the post', 'example': 'Had a great day at the park!'},
                    'images': {
                        'type': 'array',
                        'items': {'type': 'string'},
                        'description': 'List of image URLs for the post',
                        'example': ['https://example.com/image1.jpg', 'https://example.com/image2.jpg']
                    },
                    'main_pet_username': {'type': 'string', 'description': 'Username of the main pet tagged in the post', 'example': 'rex123'},
                    'tagged_pets': {
                        'type': 'array',
                        'items': {'type': 'string'},
                        'description': 'List of additional pet usernames tagged in the post',
                        'example': ['bella_woof', 'charlie_purr']
                    }
                }
            }
        }
    ],
    'responses': {
        201: {'description': 'Post created successfully'},
        400: {'description': 'Post must have either a caption or images'},
        404: {'description': 'Main pet not found or not owned by user'}
    }
})
def create_post():
    """Allows a user to create a post with images and pet tags."""
    data = request.get_json()
    
    caption = data.get("caption")
    main_pet_username = data.get("main_pet_username")
    tagged_pet_usernames = data.get("tagged_pets", [])
    image_urls = data.get("images", [])

    # Ensure at least a caption or an image exists
    if not caption and not image_urls:
        return jsonify({"error": "Post must have either a caption or images."}), 400

    # Validate main pet
    main_pet = None
    if main_pet_username:
        main_pet = Pet.query.filter_by(username=main_pet_username, owner_id=current_user.id).first()
        if not main_pet:
            return jsonify({"error": "Main pet not found or not owned by you."}), 404

    # Create post
    new_post = Post(user_id=current_user.id, caption=caption, main_pet_id=main_pet.id if main_pet else None)
    db.session.add(new_post)
    db.session.commit()

    # Add images
    for img_url in image_urls:
        post_image = PostImage(post_id=new_post.id, image_url=img_url)
        db.session.add(post_image)

    # Tag additional pets
    for pet_username in tagged_pet_usernames:
        pet = Pet.query.filter_by(username=pet_username).first()
        if pet:
            post_tag = PostTag(post_id=new_post.id, pet_id=pet.id)
            db.session.add(post_tag)

    db.session.commit()

    return jsonify({
        "message": "Post created successfully!",
        "post_id": new_post.id
    }), 201


##############
# GET USER POSTS
##############
@views.route('/user_posts/<string:username>', methods=['GET'])
@swag_from({
    'tags': ['Posts'],
    'summary': 'Get Posts by a User',
    'description': 'Retrieves all posts created by a specific user, including images and pet tags.',
    'parameters': [
        {
            'name': 'username',
            'in': 'path',
            'required': True,
            'type': 'string',
            'description': 'Username of the user whose posts you want to retrieve'
        }
    ],
    'responses': {
        200: {
            'description': 'List of posts',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'id': {'type': 'integer'},
                        'caption': {'type': 'string'},
                        'images': {'type': 'array', 'items': {'type': 'string'}},
                        'main_pet': {'type': 'string'},
                        'tagged_pets': {'type': 'array', 'items': {'type': 'string'}},
                        'created_at': {'type': 'string'}
                    }
                }
            }
        },
        404: {'description': 'User not found'}
    }
})
def get_user_posts(username):
    """Retrieve all posts made by a user."""
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    posts = Post.query.filter_by(user_id=user.id).all()
    return jsonify([
        {
            "id": post.id,
            "caption": post.caption,
            "images": [img.image_url for img in post.images],
            "main_pet": post.main_pet.username if post.main_pet else None,
            "tagged_pets": [tag.pet.username for tag in post.tags],
            "created_at": post.created_at
        }
        for post in posts
    ]), 200


##############
# GET PET POSTS
##############
@views.route('/pet_posts/<string:pet_username>', methods=['GET'])
@swag_from({
    'tags': ['Posts'],
    'summary': 'Get Posts Featuring a Pet',
    'description': 'Retrieves all posts where a pet is either the main tagged pet or an additional tagged pet.',
    'parameters': [
        {
            'name': 'pet_username',
            'in': 'path',
            'required': True,
            'type': 'string',
            'description': 'The username of the pet whose posts should be retrieved'
        }
    ],
    'responses': {
        200: {
            'description': 'List of posts featuring the pet',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'id': {'type': 'integer'},
                        'caption': {'type': 'string'},
                        'images': {'type': 'array', 'items': {'type': 'string'}},
                        'main_pet': {'type': 'string'},
                        'tagged_pets': {'type': 'array', 'items': {'type': 'string'}},
                        'created_at': {'type': 'string'}
                    }
                }
            }
        },
        404: {'description': 'Pet not found'}
    }
})
def get_pet_posts(pet_username):
    """Retrieve all posts where a pet is tagged or featured."""
    pet = Pet.query.filter_by(username=pet_username).first()
    if not pet:
        return jsonify({"error": "Pet not found"}), 404

    # Fetch posts where the pet is the main pet OR tagged
    posts = Post.query.filter(
        (Post.main_pet_id == pet.id) |
        (Post.id.in_([tag.post_id for tag in pet.tagged_posts]))
    ).all()

    return jsonify([
        {
            "id": post.id,
            "caption": post.caption,
            "images": [img.image_url for img in post.images],
            "main_pet": post.main_pet.username if post.main_pet else None,
            "tagged_pets": [tag.pet.username for tag in post.tags],
            "created_at": post.created_at
        }
        for post in posts
    ]), 200

#################
# UPDATE PROFILE
##################

@views.route('/update_profile', methods=['PUT'])
@login_required
@swag_from({
    'tags': ['User'],
    'summary': 'Update User Profile',
    'description': 'Allows a user to update their profile information except for the email and username.',
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'full_name': {'type': 'string', 'description': 'Full name of the user', 'example': 'John Doe'},
                    'profile_picture': {'type': 'string', 'description': 'Profile picture URL', 'example': 'https://example.com/image.jpg'},
                    'bio': {'type': 'string', 'description': 'User bio', 'example': 'Love pets and coding!'},
                    'location': {'type': 'string', 'description': 'User location', 'example': 'San Francisco, CA'},
                    'user_type': {'type': 'string', 'description': 'User type (User or Shelter)', 'example': 'User'},
                    'role': {'type': 'string', 'description': 'User role (User, Admin, Shelter)', 'example': 'User'}
                }
            }
        }
    ],
    'responses': {
        200: {'description': 'Profile updated successfully'},
        400: {'description': 'Invalid data'},
        403: {'description': 'Unauthorized action'}
    }
})
def update_profile():
    """Allows users to update their profile details except username and email."""
    data = request.get_json()

    # Allowed fields for update
    allowed_fields = {'full_name', 'profile_picture', 'bio', 'location', 'user_type', 'role'}

    # Update the user's information
    for key, value in data.items():
        if key in allowed_fields and hasattr(current_user, key):
            setattr(current_user, key, value)

    db.session.commit()

    return jsonify({"message": "Profile updated successfully"}), 200

###############
# DELETE POST
###############

@views.route('/delete_post/<int:post_id>', methods=['DELETE'])
@login_required
@swag_from({
    'tags': ['Posts'],
    'summary': 'Delete a Post',
    'description': 'Allows a user to delete their own post.',
    'parameters': [
        {
            'name': 'post_id',
            'in': 'path',
            'required': True,
            'type': 'integer',
            'description': 'The ID of the post to delete'
        }
    ],
    'responses': {
        200: {'description': 'Post deleted successfully'},
        403: {'description': 'Unauthorized: Cannot delete this post'},
        404: {'description': 'Post not found'}
    }
})
def delete_post(post_id):
    """Allows a user to delete their own post."""
    post = Post.query.get(post_id)
    
    if not post:
        return jsonify({'error': 'Post not found'}), 404

    if post.user_id != current_user.id:
        return jsonify({'error': 'Unauthorized: Cannot delete this post'}), 403

    db.session.delete(post)
    db.session.commit()

    return jsonify({'message': 'Post deleted successfully'}), 200

###############
# DELETE PET
###############

@views.route('/delete_pet/<string:pet_username>', methods=['DELETE'])
@login_required
@swag_from({
    'tags': ['Pets'],
    'summary': 'Delete a Pet',
    'description': 'Allows a user to delete a pet profile they own.',
    'parameters': [
        {
            'name': 'pet_username',
            'in': 'path',
            'required': True,
            'type': 'string',
            'description': 'The username of the pet to delete'
        }
    ],
    'responses': {
        200: {'description': 'Pet deleted successfully'},
        403: {'description': 'Unauthorized: Cannot delete this pet'},
        404: {'description': 'Pet not found'}
    }
})
def delete_pet(pet_username):
    """Allows a user to delete a pet profile they own."""
    pet = Pet.query.filter_by(username=pet_username).first()

    if not pet:
        return jsonify({'error': 'Pet not found'}), 404

    if pet.owner_id != current_user.id:
        return jsonify({'error': 'Unauthorized: Cannot delete this pet'}), 403

    db.session.delete(pet)
    db.session.commit()

    return jsonify({'message': 'Pet deleted successfully'}), 200

###############
# DELETE USER
###############

@views.route('/delete_account', methods=['DELETE'])
@login_required
@swag_from({
    'tags': ['User'],
    'summary': 'Delete User Account',
    'description': 'Allows a user to permanently delete their account and all associated data.',
    'responses': {
        200: {'description': 'User account deleted successfully'},
        403: {'description': 'Unauthorized action'}
    }
})
def delete_account():
    """Allows a user to permanently delete their account."""
    user = current_user

    # Remove all associated pets and posts first
    Pet.query.filter_by(owner_id=user.id).delete()
    Post.query.filter_by(user_id=user.id).delete()

    db.session.delete(user)
    db.session.commit()

    return jsonify({'message': 'User account deleted successfully'}), 200

##############
# LOGOUT USER
##############

from flask_login import logout_user

@views.route('/logout', methods=['POST'])
@login_required
@swag_from({
    'tags': ['User'],
    'summary': 'Log Out',
    'description': 'Logs out the current user and ends the session.',
    'responses': {
        200: {'description': 'Logged out successfully'}
    }
})
def logout():
    """Logs out the current user."""
    logout_user()
    return jsonify({'message': 'Logged out successfully'}), 200


#######################
# FOLLOW/UNFOLLOW USER
#######################

@views.route('/follow_user/<int:user_id>', methods=['POST'])
@login_required
@swag_from({
    'tags': ['Follow'],
    'summary': 'Follow another user',
    'description': 'Allows a logged-in user to follow another user.',
    'parameters': [
        {'name': 'user_id', 'in': 'path', 'type': 'integer', 'required': True}
    ],
    'responses': {
        200: {'description': 'User followed successfully'},
        400: {'description': 'Invalid operation'}
    }
})
def follow_user(user_id):
    target_user = User.query.get(user_id)
    if not target_user or target_user == current_user:
        return jsonify({'error': 'Invalid user'}), 400
    if target_user in current_user.followed_users:
        return jsonify({'message': 'Already following this user'}), 200

    current_user.followed_users.append(target_user)
    db.session.commit()
    return jsonify({'message': f'You are now following {target_user.username}'}), 200


@views.route('/unfollow_user/<int:user_id>', methods=['POST'])
@login_required
@swag_from({
    'tags': ['Follow'],
    'summary': 'Unfollow a user',
    'description': 'Allows a logged-in user to unfollow a user.',
    'parameters': [
        {'name': 'user_id', 'in': 'path', 'type': 'integer', 'required': True}
    ],
    'responses': {
        200: {'description': 'User unfollowed successfully'},
        400: {'description': 'Invalid operation'}
    }
})
def unfollow_user(user_id):
    target_user = User.query.get(user_id)
    if not target_user or target_user == current_user:
        return jsonify({'error': 'Invalid user'}), 400
    if target_user not in current_user.followed_users:
        return jsonify({'message': 'You are not following this user'}), 200

    current_user.followed_users.remove(target_user)
    db.session.commit()
    return jsonify({'message': f'You unfollowed {target_user.username}'}), 200

#######################
# FOLLOW/UNFOLLOW PET
#######################

@views.route('/follow_pet/<int:pet_id>', methods=['POST'])
@login_required
@swag_from({
    'tags': ['Follow'],
    'summary': 'Follow a pet',
    'description': 'Allows a user to follow a specific pet.',
    'parameters': [
        {'name': 'pet_id', 'in': 'path', 'type': 'integer', 'required': True}
    ],
    'responses': {
        200: {'description': 'Pet followed successfully'},
        400: {'description': 'Invalid operation'}
    }
})
def follow_pet(pet_id):
    pet = Pet.query.get(pet_id)
    if not pet:
        return jsonify({'error': 'Pet not found'}), 400
    if pet in current_user.followed_pets:
        return jsonify({'message': 'Already following this pet'}), 200

    current_user.followed_pets.append(pet)
    db.session.commit()
    return jsonify({'message': f'You are now following {pet.username}'}), 200


@views.route('/unfollow_pet/<int:pet_id>', methods=['POST'])
@login_required
@swag_from({
    'tags': ['Follow'],
    'summary': 'Unfollow a pet',
    'description': 'Allows a user to unfollow a specific pet.',
    'parameters': [
        {'name': 'pet_id', 'in': 'path', 'type': 'integer', 'required': True}
    ],
    'responses': {
        200: {'description': 'Pet unfollowed successfully'},
        400: {'description': 'Invalid operation'}
    }
})
def unfollow_pet(pet_id):
    pet = Pet.query.get(pet_id)
    if not pet:
        return jsonify({'error': 'Pet not found'}), 400
    if pet not in current_user.followed_pets:
        return jsonify({'message': 'You are not following this pet'}), 200

    current_user.followed_pets.remove(pet)
    db.session.commit()
    return jsonify({'message': f'You unfollowed {pet.username}'}), 200

#################
# FOLLOWING FEED
#################

@views.route('/feed', methods=['GET'])
@login_required
@swag_from({
    'tags': ['Feed'],
    'summary': 'Get posts from followed users and pets',
    'description': 'Shows posts made by users and pets the current user follows.',
    'responses': {200: {'description': 'List of posts'}}
})

def get_feed():
    user_ids = [u.id for u in current_user.followed_users]
    pet_ids = [p.id for p in current_user.followed_pets]

    posts = Post.query.filter(
        (Post.user_id.in_(user_ids)) | 
        (Post.main_pet_id.in_(pet_ids)) |
        (Post.tagged_pets.any(Pet.id.in_(pet_ids)))
    ).order_by(Post.created_at.desc()).all()

    posts_data = []
    for post in posts:
        posts_data.append({
            "id": post.id,
            "caption": post.caption,
            "user": post.user.username,
            "main_pet": post.main_pet.username if post.main_pet else None,
            # ✅ Now uses the cleaner relationship
            "tagged_pets": [pet.username for pet in post.tagged_pets],
            "image_urls": [img.image_url for img in post.images],
            "timestamp": post.created_at.isoformat(),
            "likes": len(post.likes),
            "comments": [{
                "user": comment.user.username,
                "content": comment.content,
                "timestamp": comment.timestamp.isoformat()
            } for comment in post.comments]
        })

    return jsonify({'feed': posts_data}), 200

###############
# EXPLORE FEED
###############

@views.route('/explore_feed', methods=['GET'])
@swag_from({
    'tags': ['Feed'],
    'summary': 'Explore Feed',
    'description': 'Returns every post on the platform in descending order by creation date.',
    'responses': {
        200: {
            'description': 'List of all posts',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'id': {'type': 'integer'},
                        'caption': {'type': 'string'},
                        'user': {'type': 'string'},
                        'main_pet': {'type': 'string'},
                        'tagged_pets': {'type': 'array', 'items': {'type': 'string'}},
                        'image_urls': {'type': 'array', 'items': {'type': 'string'}},
                        'timestamp': {'type': 'string'},
                        'likes': {'type': 'integer'},
                        'comments': {'type': 'array', 'items': {
                            'type': 'object',
                            'properties': {
                                'user': {'type': 'string'},
                                'content': {'type': 'string'},
                                'timestamp': {'type': 'string'}
                            }
                        }}
                    }
                }
            }
        }
    }
})
def explore_feed():
    """Returns all posts across the platform in reverse chronological order."""
    posts = Post.query.order_by(Post.created_at.desc()).all()

    posts_data = []
    for post in posts:
        posts_data.append({
            "id": post.id,
            "caption": post.caption,
            "user": post.user.username,
            "main_pet": post.main_pet.username if post.main_pet else None,
            "tagged_pets": [pet.username for pet in post.tagged_pets],
            "image_urls": [img.image_url for img in post.images],
            "timestamp": post.created_at.isoformat(),
            "likes": len(post.post_likes),
            "comments": [
                {
                    "user": comment.user.username,
                    "content": comment.content,
                    "timestamp": comment.timestamp.isoformat()
                }
                for comment in post.post_comments
            ]
        })

    return jsonify({'explore': posts_data}), 200


#############
# LIKE POST
#############
@views.route('/like_post/<int:post_id>', methods=['POST'])
@login_required
@swag_from({
    'tags': ['Posts'],
    'summary': 'Like a Post',
    'description': 'Allows a logged-in user to like a specific post.',
    'parameters': [
        {
            'name': 'post_id',
            'in': 'path',
            'type': 'integer',
            'required': True,
            'description': 'ID of the post to like'
        }
    ],
    'responses': {
        201: {'description': 'Post liked successfully'},
        200: {'description': 'Post already liked'},
        404: {'description': 'Post not found'}
    }
})
def like_post(post_id):
    post = Post.query.get(post_id)
    if not post:
        return jsonify({"error": "Post not found"}), 404

    if PostLike.query.filter_by(user_id=current_user.id, post_id=post_id).first():
        return jsonify({"message": "Already liked"}), 200

    like = PostLike(user_id=current_user.id, post_id=post_id)
    db.session.add(like)
    db.session.commit()
    return jsonify({"message": "Post liked!"}), 201

###############
# UNLIKE POST
###############

@views.route('/unlike_post/<int:post_id>', methods=['POST'])
@login_required
@swag_from({
    'tags': ['Posts'],
    'summary': 'Unlike a post',
    'description': 'Removes a like from a post by the current user.',
    'parameters': [
        {
            'name': 'post_id',
            'in': 'path',
            'type': 'integer',
            'required': True,
            'description': 'ID of the post to unlike'
        }
    ],
    'responses': {
        200: {'description': 'Post unliked successfully'},
        404: {'description': 'Like not found'}
    }
})
def unlike_post(post_id):
    like = PostLike.query.filter_by(user_id=current_user.id, post_id=post_id).first()
    if not like:
        return jsonify({'error': 'You have not liked this post'}), 404

    db.session.delete(like)
    db.session.commit()
    return jsonify({'message': 'Post unliked successfully'}), 200


###############
# COMMENT POST
###############

@views.route('/comment_post/<int:post_id>', methods=['POST'])
@login_required
@swag_from({
    'tags': ['Posts'],
    'summary': 'Comment on a Post',
    'description': 'Allows a logged-in user to comment on a specific post.',
    'parameters': [
        {
            'name': 'post_id',
            'in': 'path',
            'type': 'integer',
            'required': True,
            'description': 'ID of the post to comment on'
        },
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'content': {
                        'type': 'string',
                        'example': 'So cute!'
                    }
                },
                'required': ['content']
            }
        }
    ],
    'responses': {
        201: {'description': 'Comment added successfully'},
        400: {'description': 'Comment content required'},
        404: {'description': 'Post not found'}
    }
})
def comment_post(post_id):
    post = Post.query.get(post_id)
    if not post:
        return jsonify({"error": "Post not found"}), 404

    data = request.get_json()
    content = data.get('content')

    if not content:
        return jsonify({"error": "Comment content required"}), 400

    comment = PostComment(user_id=current_user.id, post_id=post_id, content=content)
    db.session.add(comment)
    db.session.commit()
    return jsonify({"message": "Comment added!"}), 201


###############
# GET COMMENTS
###############

@views.route('/post_comments/<int:post_id>', methods=['GET'])
@login_required
@swag_from({
    'tags': ['Posts'],
    'summary': 'Get comments for a post',
    'description': 'Retrieves all comments made on a specific post.',
    'parameters': [
        {
            'name': 'post_id',
            'in': 'path',
            'type': 'integer',
            'required': True,
            'description': 'ID of the post to retrieve comments for'
        }
    ],
    'responses': {
        200: {
            'description': 'List of comments',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'id': {'type': 'integer'},
                        'user': {'type': 'string'},
                        'text': {'type': 'string'},
                        'timestamp': {'type': 'string'}
                    }
                }
            }
        },
        404: {'description': 'Post not found'}
    }
})
def get_post_comments(post_id):
    post = Post.query.get(post_id)
    if not post:
        return jsonify({'error': 'Post not found'}), 404

    comments_data = [
        {
            'id': comment.id,
            'user': comment.user.username,
            'text': comment.content,
            'timestamp': comment.timestamp.isoformat()
        }
        for comment in post.post_comments 
    ]
    return jsonify({'comments': comments_data}), 200


#############
# LIST PET
#############

@views.route('/list_pet_for_adoption/<string:pet_username>', methods=['PUT'])
@login_required
@swag_from({
    'tags': ['Adoption'],
    'summary': 'List Pet for Adoption',
    'description': 'Allows a user or shelter to list their pet on the marketplace.',
    'parameters': [
        {'name': 'pet_username', 'in': 'path', 'type': 'string', 'required': True},
        {
            'name': 'body',
            'in': 'body',
            'schema': {
                'type': 'object',
                'properties': {
                    'about': {'type': 'string'},
                    'location': {'type': 'string'},
                    'contact_email': {'type': 'string'},
                    'contact_phone': {'type': 'string'},
                    'adoption_images': {
                        'type': 'array',
                        'items': {'type': 'string'}
                    },
                    'vaccinated': {'type': 'boolean'}
                },
                'required': ['about', 'location', 'contact_email']
            }
        }
    ],
    'responses': {
        200: {'description': 'Pet listed for adoption'},
        403: {'description': 'Unauthorized'},
        404: {'description': 'Pet not found'}
    }
})
def list_pet_for_adoption(pet_username):
    pet = Pet.query.filter_by(username=pet_username, owner_id=current_user.id).first()
    if not pet:
        return jsonify({'error': 'Pet not found or unauthorized'}), 404

    data = request.get_json()
    pet.about = data.get('about')
    pet.location = data.get('location')
    pet.contact_email = data.get('contact_email')
    pet.contact_phone = data.get('contact_phone')
    pet.adoption_images = data.get('adoption_images', [])
    pet.vaccinated = data.get('vaccinated', False)
    pet.adoption_posted = True

    db.session.commit()
    return jsonify({'message': f'{pet.name} listed for adoption'}), 200

####################
# GET PET ADOPTIONS
####################

@views.route('/adoption_market', methods=['GET'])
@swag_from({
    'tags': ['Adoption'],
    'summary': 'Get Pets Listed for Adoption (Filterable)',
    'description': 'Returns adoptable pets, with optional filters for species, breed, age, size, gender, and location.',
    'parameters': [
        {'name': 'species', 'in': 'query', 'type': 'string'},
        {'name': 'breed', 'in': 'query', 'type': 'string'},
        {'name': 'age', 'in': 'query', 'type': 'integer'},
        {'name': 'size', 'in': 'query', 'type': 'string'},
        {'name': 'gender', 'in': 'query', 'type': 'string'},
        {'name': 'location', 'in': 'query', 'type': 'string'},
        {'name': 'sort_by', 'in': 'query', 'type': 'string', 'enum': ['newest', 'oldest', 'age_asc', 'age_desc']}
    ],
    'responses': {200: {'description': 'Filtered list of pets'}}
})
def get_adoption_market():
    query = Pet.query.filter_by(adoption_posted=True)

    # Filtering
    species = request.args.get('species')
    breed = request.args.get('breed')
    age = request.args.get('age', type=int)
    size = request.args.get('size')
    gender = request.args.get('gender')
    location = request.args.get('location')
    sort_by = request.args.get('sort_by', 'newest')

    if species:
        query = query.filter_by(species=species)
    if breed:
        query = query.filter_by(breed=breed)
    if age is not None:
        query = query.filter_by(age=age)
    if size:
        query = query.filter_by(size=size)
    if gender:
        query = query.filter_by(gender=gender)
    if location:
        query = query.filter(Pet.location.ilike(f"%{location}%"))

    # Sorting
    if sort_by == 'newest':
        query = query.order_by(Pet.id.desc())
    elif sort_by == 'oldest':
        query = query.order_by(Pet.id.asc())
    elif sort_by == 'age_asc':
        query = query.order_by(Pet.age.asc())
    elif sort_by == 'age_desc':
        query = query.order_by(Pet.age.desc())

    pets = query.all()

    pet_list = [{
        'name': pet.name,
        'username': pet.username,
        'species': pet.species,
        'breed': pet.breed,
        'age': pet.age,
        'size': pet.size,
        'color': pet.color,
        'weight': pet.weight,
        'gender': pet.gender,
        'vaccinated': pet.vaccinated,
        'about': pet.about,
        'location': pet.location,
        'adoption_images': pet.adoption_images or [],
        'contact_email': pet.contact_email,
        'contact_phone': pet.contact_phone,
        'shelter': pet.owner.username if pet.owner else None
    } for pet in pets]

    return jsonify({'pets': pet_list}), 200

####################
# SEARCH ACCOUNTS
####################

@views.route('/search_accounts', methods=['GET'])
@swag_from({
    'tags': ['User'],
    'summary': 'Search Users, Shelters, or Pets',
    'description': 'Search accounts based on username, first/last name, or email, with optional filters by type.',
    'parameters': [
        {'name': 'q', 'in': 'query', 'type': 'string', 'required': True},
        {'name': 'type', 'in': 'query', 'type': 'string', 'enum': ['User', 'Shelter', 'Pet']}
    ],
    'responses': {
        200: {'description': 'Search results including account type'}
    }
})
def search_accounts():
    q = request.args.get('q', '')
    account_type = request.args.get('type')  # Optional

    user_query = User.query.filter(
        (User.username.ilike(f"%{q}%")) |
        (User.full_name.ilike(f"%{q}%")) |
        (User.email.ilike(f"%{q}%"))
    )
    pet_query = Pet.query.filter(
        (Pet.username.ilike(f"%{q}%")) |
        (Pet.name.ilike(f"%{q}%"))
    )

    if account_type == 'User':
        user_query = user_query.filter(User.user_type == 'User')
        users = user_query.all()
        results = [{'type': 'User', 'username': u.username, 'name': u.full_name} for u in users]
    elif account_type == 'Shelter':
        user_query = user_query.filter(User.user_type == 'Shelter')
        shelters = user_query.all()
        results = [{'type': 'Shelter', 'username': s.username, 'name': s.full_name} for s in shelters]
    elif account_type == 'Pet':
        pets = pet_query.all()
        results = [{'type': 'Pet', 'username': p.username, 'name': p.name} for p in pets]
    else:
        # Mixed results
        users = user_query.all()
        pets = pet_query.all()
        results = (
            [{'type': 'User' if u.user_type == 'User' else 'Shelter', 'username': u.username, 'name': u.full_name} for u in users] +
            [{'type': 'Pet', 'username': p.username, 'name': p.name} for p in pets]
        )

    return jsonify({'results': results}), 200

####################
# SORT PET ADOPTIONS
####################



####################
# SORT PET ADOPTIONS
####################



####################
# SORT PET ADOPTIONS
####################



####################
# SORT PET ADOPTIONS
####################