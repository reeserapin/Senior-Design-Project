import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaCheckCircle, FaComments, FaShoppingBag, FaCog, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { TbBinaryTree } from 'react-icons/tb';    
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
          <Link to="/" className="nav-link">
            <FaHome className="nav-icon" />
            Home
          </Link>
        </li>
        <li>
          <Link to="/pedigree" className="nav-link">
            <TbBinaryTree className="nav-icon" />
            Pedigree
          </Link>
        </li>
        <li>
          <Link to="/messsages" className="nav-link chat-link">
            <FaComments className="nav-icon chat-icon" />
            Messages
          </Link>
        </li>
        <li>
          <Link to="/petshop" className="nav-link">
            <FaShoppingBag className="nav-icon" />
            Pet Shop
          </Link>
        </li>
        <li>
          <Link to="/settings" className="nav-link">
            <FaCog className="nav-icon" />
            Settings
          </Link>
        </li>
      </ul>
      <div className="sidebar-footer">
        <Link to="/logout" className="nav-link logout-link">
          <FaSignOutAlt className="nav-icon" />
          Logout
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
