// src/pages/Sidebar.jsx
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaCheckCircle, FaComments, FaShoppingBag, FaCog, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { TbBinaryTree } from 'react-icons/tb';
import { useUser } from '../UserContext';
import PostButton from './PostButton';
import '../styles/TopAndSide.css';

function Sidebar({ pets, handleAddPost, followedPets, setIsLoggedIn }) {

  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === '/';
  const isSignupPage = location.pathname === '/signup';
  const isAuthPage = isLoginPage || isSignupPage;
  const { profileImage } = useUser();

  const handleLogout = async () => {

    setIsLoggedIn(false);   // ✅ logout on frontend
    navigate('/');          // ✅ return to login page

    // try {
    //   const response = await fetch('http://localhost:5000/logout', {
    //     method: 'POST',
    //     credentials: 'include', // sends cookies
    //   });
  
    //   if (response.ok) {
    //     console.log('Logged out');
    //     navigate('/');
    //   } else {
    //     const error = await response.json();
    //     console.error('Logout failed:', error);
    //     alert('Failed to logout. Try again.');
    //   }
    // } catch (err) {
    //   console.error('Logout error:', err);
    //   alert('Error logging out.');
    // }
  };
  

  return (
    <div className={`ts-sidebar ${isAuthPage ? 'auth-page' : ''}`}>
  {!isAuthPage && (
    <>
      <Link to="/profile" className="ts-nav-item">
        <img
          src={profileImage}
          alt="Profile"
          className="ts-profile-image-large"
        />
        <span className="ts-nav-label">Profile</span>
      </Link>

      <ul>
      <li>
          <PostButton pets={pets} onPost={handleAddPost} />


          </li>
        <li>
        <Link
          to="/home"
          className={`ts-nav-item ${location.pathname === '/home' ? 'active' : ''}`}
        >
          <FaHome className="ts-nav-icon" />
          <span className="ts-nav-label">Home</span>
        </Link>

        </li>
        <li>
          <Link
            to="/pedigree"
            className={`ts-nav-item ${location.pathname === '/pedigree' ? 'active' : ''}`}
          >
            <TbBinaryTree className="ts-nav-icon" />
            <span className="ts-nav-label">Pedigree</span>
          </Link>
        </li>
        <li>
          <Link
            to="/chat"
            className={`ts-nav-item ${location.pathname === '/chat' ? 'active' : ''}`}
          >
            <FaComments className="ts-nav-icon" />
            <span className="ts-nav-label">Messages</span>
          </Link>
        </li>
        <li>
          <Link
            to="/petshop"
            className={`ts-nav-item ${location.pathname === '/petshop' ? 'active' : ''}`}
          >
            <FaShoppingBag className="ts-nav-icon" />
            <span className="ts-nav-label">Pet Shop</span>
          </Link>

        </li>
        <li>
          <Link
            to="/settings"
            className={`ts-nav-item ${location.pathname === '/settings' ? 'active' : ''}`}
          >
            <FaCog className="ts-nav-icon" />
            <span className="ts-nav-label">Settings</span>
          </Link>
        </li>

      </ul>

      <div className="ts-sidebar-footer">
        <button onClick={handleLogout} className="ts-nav-item ts-logout-button">
          <FaSignOutAlt className="ts-nav-icon" />
          <span className="ts-nav-label">Logout</span>
        </button>
      </div>
    </>
  )}
</div>

  );
}

export default Sidebar;
