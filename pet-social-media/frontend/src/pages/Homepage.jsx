import React, { useState } from "react";
import { FaPaw, FaFlag, FaComment, FaPaperPlane, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import postsData from "../pages/posts.json"; // Import JSON data
import "../styles/Homepage.css";

const PetPost = ({ user, avatar, pfp, images, title, bgColor, comments }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentList, setCommentList] = useState(comments);
  const [newComment, setNewComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const toggleComments = () => setShowComments(!showComments);
  const toggleLike = () => setLiked(!liked);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() !== "") {
      const newCommentObj = {
        username: "CurrentUser",
        pfp: "/users/default_pfp.jpg",
        text: newComment
      };
      setCommentList([...commentList, newCommentObj]);
      setNewComment("");
    }
  };

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className={`pet-card ${bgColor}`}>
      <div className="pet-header">
        <img src={avatar} alt={user} className="pet-avatar" />
        <p className="pet-title">{user}</p>
      </div>

      <div className="pet-content-box">
        <img src={pfp} alt={title} className="pet-pfp" />
        <p className="pet-title">{title}</p>
        <div className="image-container">
          {images.length > 1 && <button className="image-nav left" onClick={prevImage}><FaArrowLeft /></button>}
          <img src={images[currentImageIndex]} alt={title} className="pet-image" />
          {images.length > 1 && <button className="image-nav right" onClick={nextImage}><FaArrowRight /></button>}
        </div>
      </div>

      <div className="pet-actions">
        <FaPaw className={`pet-icon ${liked ? "text-red-500" : "text-gray-500"}`} onClick={toggleLike} />
        <FaComment className="pet-icon" onClick={toggleComments} />
        <FaPaperPlane className="pet-icon" />
        <FaFlag className="pet-icon text-gray-500" />
      </div>

      {showComments && (
        <div className="comment-section">
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <img src="/users/default_pfp.jpg" alt="User" className="comment-pfp" />
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
