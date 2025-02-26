import React from 'react';
import { Link } from 'react-router-dom';

function TopBar() {
  return (
    <div className="topbar">
      <h1>Pet-igree</h1>
      <div className="topbar-content">
      <Link to="/petprofile">
         <div className="cat-image">
          <img
            src="/public/cat4.jpg"
            alt="Profile"
            className="profile-image"
          />
        </div>
      </Link>
        <div className="plus-circle">
        <img
          src="/public/pluscircle.png"
          alt="Profile"
          className="profile-image"
        />
        </div>
        <div className="search-container">
          <input type="text" placeholder="Search..." className="search-bar" />
        </div>
      </div>
    </div>
  );
}

export default TopBar;