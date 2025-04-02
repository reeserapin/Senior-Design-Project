import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaCheckCircle, FaMessage, FaShoppingBag, FaCog, FaUser } from 'react-icons/fa';
import './styles/TopAndSide.css'; 

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/profile">
        <img
          src="/public/linkedGirl.jpg"
          alt="Profile"
          className="profile-image"
        />
      </Link>
      <ul>
        <li>
          <Link to="/">
            <FaHome className="nav-icon" />
            Home
          </Link>
        </li>
        <li>
          <Link to="/pedigree">
            <FaCheckCircle className="nav-icon" />
            Pedigree
          </Link>
        </li>
        <li>
          <Link to="/post" className="chat-link">
            <FaMessage className="nav-icon chat-icon" />
            Messages
          </Link>
        </li>
        <li>
          <Link to="/petshop">
            <FaShoppingBag className="nav-icon" />
            Pet Shop
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <FaCog className="nav-icon" />
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
