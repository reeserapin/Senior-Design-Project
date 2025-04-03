import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles/TopAndSide.css';

function TopBar() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const [query, setQuery] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [catImages, setCatImages] = useState([]);

  const handleSearch = () => {
    alert(`Searching for: ${query}`);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImage = () => {
    if (selectedImage) {
      setCatImages((prevImages) => [...prevImages, selectedImage]);
      setIsPopupOpen(false);
      setSelectedImage(null);
    } else {
      alert("Please select an image first.");
    }
  };

  return (
    <div className="topbar">
      <div className="left-content">
        <h1 className="logo">Pet-igree</h1>
        {!isLoginPage && (
          <>
            <Link to="/petprofile" className="profile-link">
              <img src="/golden_retriever_pfp.jpg" alt="Profile" className="profile-image" />
            </Link>
            {catImages.map((image, index) => (
              <Link to={`/petprofile/${index}`} key={index} className="profile-link">
                <img src={image} alt={`Cat Profile ${index}`} className="profile-image" />
              </Link>
            ))}
            <img
              src="/pluscircle.png"
              alt="Add"
              className="plus-icon"
              onClick={() => setIsPopupOpen(true)}
            />
          </>
        )}
      </div>
      {!isLoginPage && (
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
      )}

      {!isLoginPage && isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>New Pet?</h2>
            <h4>Enter a code to transfer pet account or create a new account by uploading pet info.</h4>
            <h3>What is your pet's name?</h3>
            <h3>Upload a profile picture:</h3>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="popup-input-file"
            />
            {selectedImage && (
              <div>
                <h3>Image Preview:</h3>
                <img src={selectedImage} alt="Selected Cat" className="popup-image-preview" />
              </div>
            )}
            <button onClick={handleAddImage} className="popup-button">
              Add Pet
            </button>
            <button onClick={() => setIsPopupOpen(false)} className="popup-close">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TopBar;
