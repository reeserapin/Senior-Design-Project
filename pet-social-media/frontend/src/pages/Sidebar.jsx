// src/pages/Sidebar.jsx
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaCheckCircle, FaComments, FaShoppingBag, FaCog, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { TbBinaryTree } from 'react-icons/tb';
import { useUser } from '../UserContext';
import '../styles/TopAndSide.css';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isSignupPage = location.pathname === '/signup';
  const isAuthPage = isLoginPage || isSignupPage;
  const { profileImage } = useUser();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className={`ts-sidebar ${isAuthPage ? 'auth-page' : ''}`}>
      {!isAuthPage && (
        <>
          <Link to="/profile">
            <img
              src={profileImage}
              alt="Profile"
              className="ts-profile-image"
            />
          </Link>
          <ul>
            <li>
              <Link to="/" className="ts-nav-link">
                <FaHome className="ts-nav-icon" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/pedigree" className="ts-nav-link">
                <TbBinaryTree className="ts-nav-icon" />
                <span>Pedigree</span>
              </Link>
            </li>
            <li>
              <Link to="/chat" className="ts-nav-link">
                <FaComments className="ts-nav-icon" />
                <span>Messages</span>
              </Link>
            </li>
            <li>
              <Link to="/petshop" className="ts-nav-link">
                <FaShoppingBag className="ts-nav-icon" />
                <span>Pet Shop</span>
              </Link>
            </li>
            <li>
              <Link to="/settings" className="ts-nav-link">
                <FaCog className="ts-nav-icon" />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
          <div className="ts-sidebar-footer">
            <button onClick={handleLogout} className="ts-nav-link ts-logout-link">
              <FaSignOutAlt className="ts-nav-icon" />
              <span>Logout</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Sidebar;
