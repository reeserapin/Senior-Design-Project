// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/profile">
        <img
          src="/public/linkedGirl.jpg" // Correct path in 'public' folder
          alt="Profile"
          className="profile-image"
        />
      </Link>
      <ul>
        <li>
          <Link to="/">
            <img src="/public/home.png" alt="Home" className="nav-icon" />
            Home
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <img src="/public/checkcircle.png" alt="Pedigree" className="nav-icon" />
            Pedigree
          </Link>
        </li>
        <li>
          <Link to="/post">
            <img src="/public/home.png" alt="Post" className="nav-icon" />
            Post
          </Link>
        </li>
        <li>
          <Link to="/alert">
            <img src="/public/home.png" alt="Alert" className="nav-icon" />
            Alert
          </Link>
        </li>
        <li>
          <Link to="/petshop">
            <img src="/public/home.png" alt="Pet Shop" className="nav-icon" />
            Pet Shop
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <img src="/public/home.png" alt="Settings" className="nav-icon" />
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
