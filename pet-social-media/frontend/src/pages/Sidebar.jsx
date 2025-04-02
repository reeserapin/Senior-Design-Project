// src/pages/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/TopAndSide.css'; 
import { useUser } from '../UserContext'; // ✅ correct relative path

function Sidebar() {
  const { profileImage } = useUser(); // ✅ get it from context

  return (
    <div className="sidebar">
      <Link to="/profile">
        <img
          src={profileImage || "/linkedGirl.jpg"} // ✅ fallback image
          alt="Profile"
          className="profile-image"
        />
      </Link>
      <ul>
        <li><Link to="/"><img src="/home.png" alt="Home" className="nav-icon" /> Home</Link></li>
        <li><Link to="/pedigree"><img src="/checkcircle.png" alt="Pedigree" className="nav-icon" /> Pedigree</Link></li>
        <li><Link to="/post"><img src="/home.png" alt="Post" className="nav-icon" /> Post</Link></li>
        <li><Link to="/alert"><img src="/heart.png" alt="Alert" className="nav-icon" /> Alert</Link></li>
        <li><Link to="/petshop"><img src="/bag.png" alt="Pet Shop" className="nav-icon" /> Pet Shop</Link></li>
        <li><Link to="/settings"><img src="/settings.png" alt="Settings" className="nav-icon" /> Settings</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
