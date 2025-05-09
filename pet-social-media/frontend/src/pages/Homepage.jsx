import React, { useState } from "react";
import { FaPaw, FaFlag, FaComment, FaPaperPlane, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import SharePopup from "./Sharedmenu";
import ReportMenu from "./Reportmenu";
import SidePanels from "../components/SidePanels";
import postsData from "../pages/posts.json";
import { useUser } from "../UserContext";
import "../styles/Homepage.css";

const PetPost = ({ user, avatar, pfp, images, title, bgColor, comments, petNames }) => {
  const [activePanel, setActivePanel] = useState(null); // null, 'comments', 'share', or 'report'
  const [commentList, setCommentList] = useState(comments);
  const [newComment, setNewComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { profileImage } = useUser();

  const toggleComments = () => {
    setActivePanel(activePanel === 'comments' ? null : 'comments');
  };

  const toggleShare = () => {
    setActivePanel(activePanel === 'share' ? null : 'share');
  };

  const toggleReport = () => {
    setActivePanel(activePanel === 'report' ? null : 'report');
  };

  const toggleLike = () => setLiked(!liked);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() !== "") {
      const newCommentObj = {
        username: "Molly McKay",
        pfp: profileImage,
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
    { id: 1, name: "Laila Jackson", image: "/users/Laila_Jackson.jpg" },
    { id: 2, name: "Subira Awa", image: "/users/Subira_Awa.jpg" },
    { id: 3, name: "Omar Manfredo", image: "/users/Omar_Manfredo.webp" }
  ];

  return (
    <div className={`homepage-pet-card ${bgColor === 'bg-1' ? 'homepage-bg-1' : bgColor === 'bg-2' ? 'homepage-bg-2' : bgColor === 'bg-3' ? 'homepage-bg-3' : 'homepage-bg-2'} relative`}>
  
      {/* TOP BANNER */}
      <div className="homepage-post-banner">
      <div className="homepage-post-banner-left">
        <div className="homepage-avatar-stack">
        <img src={Array.isArray(pfp) ? pfp[0] : pfp} className="homepage-post-main-pfp" />
          <img src={avatar} alt="User" className="homepage-post-user-avatar" />
        </div>
        <div className="homepage-post-names">
          <p className="homepage-post-petname">{petNames?.[0]}</p>
          <p className="homepage-post-username">{user}</p>
        </div>
      </div>

  
        {/* Additional Tagged Pets */}
        {Array.isArray(pfp) && pfp.length > 1 && (
          <div className="homepage-post-tagged-pets">
            {pfp.slice(1).map((pic, index) => (
              <img key={index} src={pic} className="homepage-post-tagged-pfp" alt="Tagged Pet" />
            ))}
          </div>
        )}
      </div>
  
      {/* IMAGE SECTION FULL WIDTH */}
      <div className="homepage-image-full-container">
        {images.length > 1 && <button className="homepage-image-nav left" onClick={prevImage}><FaArrowLeft /></button>}
        <img src={images[currentImageIndex]} alt={title} className="homepage-full-image" />
        {images.length > 1 && <button className="homepage-image-nav right" onClick={nextImage}><FaArrowRight /></button>}
      </div>
  
      {/* BOTTOM BANNER */}
      <div className="homepage-post-actions-bar">
        <div className="homepage-post-left-icons">
          <FaPaw className={`homepage-pet-icon ${liked ? "homepage-text-red-500" : "homepage-text-gray-500"}`} onClick={toggleLike} />
          <FaComment className={`homepage-pet-icon ${activePanel === 'comments' ? 'homepage-text-blue-500' : ''}`} onClick={toggleComments} />
          <FaPaperPlane className={`homepage-pet-icon ${activePanel === 'share' ? 'homepage-text-blue-500' : ''}`} onClick={toggleShare} />
        </div>
  
        <p className="homepage-post-user-label">{title}</p>
        <div className="homepage-post-right-icons">
        <FaFlag className={`homepage-pet-icon ${activePanel === 'report' ? 'homepage-text-blue-500' : 'homepage-text-gray-500'}`} onClick={toggleReport} />
        </div></div>
  
      {/* Popups */}
      {activePanel === 'share' && <SharePopup users={users} onShare={handleShare} onClose={() => setActivePanel(null)} />}
      {activePanel === 'report' && <ReportMenu onClose={() => setActivePanel(null)} />}
      {activePanel === 'comments' && (
        <div className="homepage-comment-section">
          <form onSubmit={handleCommentSubmit} className="homepage-comment-form">
            <img src={profileImage} alt="User" className="homepage-comment-pfp" />
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="homepage-comment-input"
            />
            <button type="submit" className="homepage-comment-submit">Post</button>
          </form>

          <div className="homepage-comments-list">
            {commentList.map((comment, index) => (
              <div key={index} className="homepage-comment">
                <img src={comment.pfp} alt={comment.username} className="homepage-comment-pfp" />
                <div>
                  <p className="homepage-comment-username">{comment.username}</p>
                  <p className="homepage-comment-text">{comment.text}</p>
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
    <div className="homepage-container">
      <div className="homepage-posts-container">
        {postsData.map((post, index) => (
          <PetPost key={index} {...post} />
        ))}
      </div>
      <SidePanels />
    </div>
  );
};

export default PetPosts;
