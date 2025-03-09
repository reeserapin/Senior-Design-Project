import React, { useState } from "react";
import { FaPaw, FaFlag, FaComment, FaPaperPlane } from "react-icons/fa";
import "../styles/Homepage.css"; 

const postsData = [
  {
    user: "Leslie Mosier",
    avatar: "./doug_the_pug/LeslieMosier.jpg",
    images: ["./doug_the_pug/doug_post.jpg"],
    petNames: ["Teddy", "Daisy"],
    title: "Doug the Pug",
    bgColor: "bg-blue",
    comments: [
      { username: "JohnDoe", pfp: "./users/john_doe.jpg", text: "Doug is so adorable! ❤️" },
      { username: "PetLover99", pfp: "./users/pet_lover.jpg", text: "Aww, I love pugs!" }
    ]
  },
  {
    user: "SPCA",
    avatar: "./spca/spca_logo.png",
    images: ["./spca/Spca_post.webp"],
    petNames: ["Rocky"],
    title: "Rocky",
    bgColor: "bg-green",
    comments: [
      { username: "EmmaWatts", pfp: "./users/emma_watts.jpg", text: "Rocky deserves a loving home! 🐶" },
      { username: "AdoptMe", pfp: "./users/adopt_me.jpg", text: "Where is he located? I’d love to adopt!" }
    ]
  },
  {
    user: "Diya Sharma",
    avatar: "./kitten_breeder/Diya_Sharma.jpg",
    images: ["./kitten_breeder/three_kittens.jpg"],
    petNames: ["kittens"],
    title: "kittens",
    bgColor: "bg-yellow",
    comments: [
      { username: "MeowMeow", pfp: "./users/meow_meow.jpg", text: "These kittens are too cute! 😻" },
      { username: "CatFanatic", pfp: "./users/cat_fan.jpg", text: "I want them all!!" }
    ]
  }
];

const PetPost = ({ user, avatar, images, petNames, title, bgColor, comments }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentList, setCommentList] = useState(comments);
  const [newComment, setNewComment] = useState("");

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() !== "") {
      const newCommentObj = {
        username: "CurrentUser",
        pfp: "./users/default_pfp.jpg", // Placeholder for logged-in user
        text: newComment
      };
      setCommentList([...commentList, newCommentObj]);
      setNewComment("");
    }
  };

  return (
    <div className={`pet-card ${bgColor}`}>
      {/* Post Header */}
      <div className="pet-header">
        <img src={avatar} alt={user} className="pet-avatar" />
        <p className="pet-title">{user}</p>
      </div>

      {/* Post Title */}
      <h2 className="pet-title">{title}</h2>

      {/* Post Image */}
      <div>
        {images.map((img, index) => (
          <img key={index} src={img} alt={petNames[index]} className="pet-image" />
        ))}
      </div>

      {/* Action Icons */}
      <div className="pet-actions">
        <FaPaw className="pet-icon text-red-500" />
        <FaComment className="pet-icon" onClick={toggleComments} />
        <FaPaperPlane className="pet-icon" />
        <FaFlag className="pet-icon text-gray-500" />
      </div>

      {/* Comment Section */}
      {showComments && (
        <div className="comment-section">
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <img src="./users/default_pfp.jpg" alt="User" className="comment-pfp" />
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="comment-input"
            />
            <button type="submit" className="comment-submit">Post</button>
          </form>

          <div className="comments-list">
            {commentList.map((comment, index) => (
              <div key={index} className="comment">
                <img src={comment.pfp} alt={comment.username} className="comment-pfp" />
                <div>
                  <p className="comment-username">{comment.username}</p>
                  <p className="comment-text">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const PetPosts = () => {
  return (
    <div className="posts-container">
      {postsData.map((post, index) => (
        <PetPost key={index} {...post} />
      ))}
    </div>
  );
};

export default PetPosts;
