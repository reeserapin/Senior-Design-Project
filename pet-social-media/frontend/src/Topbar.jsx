import React from 'react';

function TopBar() {
  return (
    <div className="topbar">
      <h1>Pet-igree</h1>
      <div className="topbar-content">
         <div className="cat-image">
          <img
            src="/public/cat4.jpg"
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