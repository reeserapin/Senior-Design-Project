import React, { useState } from "react";
import { FaPaw, FaFlag, FaComment, FaPaperPlane, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import SharePopup from "./Sharedmenu"; // Fixed import path
import postsData from "../pages/posts.json";
import "../styles/Homepage.css";

const PetPost = ({ user, avatar, pfp, images, title, bgColor, comments }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentList, setCommentList] = useState(comments);
  const [newComment, setNewComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const toggleComments = () => setShowComments(!showComments);
  const toggleLike = () => setLiked(!liked);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() !== "") {
      const newCommentObj = {
        username: "Molly McKay",
        pfp: "/linkedGIRL.jpg",
        text: newComment
      };
      setCommentList([...commentList, newCommentObj]);
      setNewComment("");
    }
  };

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleShare = (sharedUser) => {
    console.log(`Post shared with ${sharedUser.name}`);
  };

  // Dummy user list for sharing
  const users = [
    { id: 1, name: "Alice Doe", image: "/alice.jpg" },
    { id: 2, name: "Bob Smith", image: "/bob.jpg" },
    { id: 3, name: "Charlie Brown", image: "/charlie.jpg" }
  ];

  return (
    <div className={`pet-card ${bgColor} relative`}>
      <div className="pet-header">
        <img src={avatar} alt={user} className="pet-avatar" />
        <p className="pet-title">{user}</p>
      </div>

      <div className="pet-content-box">
        <div className="pet-info">
          <div className="pet-pfp-container">
            {Array.isArray(pfp) ? (
              pfp.map((pic, index) => (
                <img key={index} src={pic} alt={`pfp-${index}`} className="pet-pfp" />
              ))
            ) : (
              <img src={pfp} alt={title} className="pet-pfp" />
            )}
          </div>
          <p className="pet-title">{title}</p>
        </div>

        <div className="image-container">
          {images.length > 1 && <button className="image-nav left" onClick={prevImage}><FaArrowLeft /></button>}
          <img src={images[currentImageIndex]} alt={title} className="pet-image" />
          {images.length > 1 && <button className="image-nav right" onClick={nextImage}><FaArrowRight /></button>}
        </div>
      </div>

      <div className="pet-actions">
        <FaPaw className={`pet-icon ${liked ? "text-red-500" : "text-gray-500"}`} onClick={toggleLike} />
        <FaComment className="pet-icon" onClick={toggleComments} />
        <FaPaperPlane className="pet-icon" onClick={() => setIsShareOpen(!isShareOpen)} />
        <FaFlag className="pet-icon text-gray-500" />
      </div>

      {isShareOpen && (
        <SharePopup users={users} onShare={handleShare} onClose={() => setIsShareOpen(false)} />
      )}

      {showComments && (
        <div className="comment-section">
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <img src="/linkedGIRL.jpg" alt="User" className="comment-pfp" />
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
