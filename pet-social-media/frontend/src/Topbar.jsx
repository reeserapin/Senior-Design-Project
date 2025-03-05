import React from 'react';
import { Link } from 'react-router-dom';

function TopBar() {
  return (
    <div className="topbar">
      <div className="left-content">
        <h1 className="logo">Pet-igree</h1>
        <Link to="/petprofile" className="profile-link">
          <img src="/cat4.jpg" alt="Profile" className="profile-image" />
        </Link>
        <img src="/pluscircle.png" alt="Add" className="plus-icon" />
      </div>
      <div className="search-container">
        <input type="text" placeholder="Search..." className="search-bar" />
      </div>
    </div>
  );
}

export default TopBar;
