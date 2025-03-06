import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './styles/TopAndSide.css'; 

function TopBar() {
  const [query, setQuery] = useState(''); 

  const handleSearch = () => {
    // Implement your search functionality here
    alert(`Searching for: ${query}`);
  };

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
        <input
          type="text"
          placeholder="Search..."
          className="search-bar"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          <img src="/search.png" alt="Search" className="search-icon" />
        </button>
      </div>
    </div>
  );
}

export default TopBar;
