import React, { useState } from 'react';
import AddPetModal from './AddPetModal';
import { FiPlusCircle } from 'react-icons/fi';
import PostButton from './PostButton';

function TopBar({ pets, followedPets, setPets, setActivePet }) {
  const [query, setQuery] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleSearch = () => {
    alert(`Searching for: ${query}`);
  };

  const handleAddPet = (newPet) => {
    setPets([...pets, newPet]);
    setIsPopupOpen(false);
  };

  return (
    <div className="topbar">
      {/* Left section: Logo + Pets */}
      <div className="topbar-left">
        <h1 className="ts-logo">Pet-igree</h1>
        {pets.map((pet, index) => (
          <button
            key={index}
            className="profile-link"
            onClick={() =>
              setActivePet({
                ...pet,
                onHealthUpdate: (field, value) => {
                  const updated = pets.map((p) =>
                    p.name === pet.name ? { ...p, [field]: value } : p
                  );
                  setPets(updated);
                  setActivePet((prev) => ({ ...prev, [field]: value }));
                },
              })
            }
          >
            <img src={pet.image} alt={pet.name} className="ts-profile-image" />
          </button>
        ))}
        <div className="ts-plus-icon" onClick={() => setIsPopupOpen(true)}>
          <FiPlusCircle size={36} />
        </div>
      </div>

      {/* Center section: Post button */}
      <div className="topbar-center">
      <PostButton pets={pets} followedPets={followedPets} />

      </div>

      {/* Right section: Search */}
      <div className="topbar-right">
        <input
          type="text"
          placeholder="Search..."
          className="ts-search-bar"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="ts-search-button" onClick={handleSearch}>
          <img src="/search.png" alt="Search" className="ts-search-icon" />
        </button>
      </div>

      {isPopupOpen && (
        <AddPetModal
          onClose={() => setIsPopupOpen(false)}
          onSave={handleAddPet}
        />
      )}
    </div>
  );
}

export default TopBar;


/* Embedded CSS */
const style = document.createElement('style');
style.innerHTML =  `

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  background-color: #099EC8;
  height: 60px;
  position: fixed;
  width: 100%;
  z-index: 1000;
}

.topbar-left,
.topbar-center,
.topbar-right {
  display: flex;
  align-items: center;
}

.topbar-left {
  gap: 10px;
}

.topbar-center {
  justify-content: center;
  flex: 1;
}

.topbar-right {
  gap: 10px;
}

.profile-link {
  background: none;
  border: none;
  padding: 0;
  margin: 0 6px;
  cursor: pointer;
}

.profile-link:focus {
  outline: none;
}

.profile-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid white;
}

/* Topbar Styles */
.topbar {
    background-color: #099EC8;
    color: white;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    height: 60px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
}

.left-content {
    display: flex;
    align-items: center;
    gap: 15px;
}

.logo {
    font-size: 24px;
    font-weight: bold;
}

/* Profile Image */
.profile-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 5px;
}

/* Plus Icon */
.plus-icon {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    cursor: pointer;
}

/* Search Bar */
.search-bar {
    position: absolute;
    right: 50px;
    top: 50%;
    padding: 8px;
    border-radius: 15px;
    border: 1px solid white;
    outline: none;
    width: 200px; 
    transform: translateY(-50%);
}

.search-button {
    position: absolute;
    right: 50px;
    background: transparent;
    border: none;
    cursor: pointer;
    transform: translateY(-50%);
}

.search-button:focus {
    outline: none;
    box-shadow: none; 
}

.search-icon {
    width: 20px;
    height: 20px;
}

/* Popup styles */
.popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1001;
    font-size: 20px;
    color: #000;
}

.popup-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 300px;
}

.popup-input-file {
    padding: 10px;
    width: 100%;
    border-radius: 5px;
    border: 1px solid #ddd;
    cursor: pointer;
}

.popup-button {
    padding: 10px 20px;
    background-color: #9DD8EA;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.popup-button:hover {
    background-color: #87bcd8;
}

.popup-close {
    padding: 10px 20px;
    background-color: #ccc;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.popup-close:hover {
    background-color: #bbb;
}

/* Sidebar Styles */
.sidebar {
    background-color: #9DD8EA; 
    color: black;
    padding: 40px 10px 20px;
    width: 70px;
    height: calc(100vh - 60px);
    display: flex;
    position: fixed; 
    flex-direction: column;
    align-items: center;
    gap: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    top: 60px;
    left: 0;
}

.sidebar ul {
    list-style: none; 
    padding: 0;
    margin: 0;
    width: 100%;
}

.sidebar li {
    display: flex;
    flex-direction: column; 
    align-items: center;
    justify-content: center;
    margin: 30px 0; 
}

.sidebar a {
    display: flex;
    flex-direction: column; 
    align-items: center;
    justify-content: center;
    color: black;
    font-weight: 500;
    font-size: 12px;
    text-align: center;
    text-decoration: none;
    gap: 10px; 
}

.sidebar img,
.sidebar .nav-icon {
    width: 30px;
    height: 30px;
}

.sidebar .profile-image {
    width: 50px; 
    height: 50px; 
    border-radius: 50%; 
    border: 2px solid black; 
}

.sidebar a:hover {
    color: #646cff;
}

.sidebar a.active {
    color: #535bf2;
}

.sidebar .profile-image {
    width: 50px; 
    height: 50px; 
    border-radius: 50%; 
    border: 2px solid black; 
    object-fit: cover;
    display: block !important; /* Ensures it is always visible */
    position: relative; /* Avoids any conflicting positioning */
    z-index: 10; /* Makes sure it's not hidden behind other elements */
}


.content {
    flex-grow: 1;
    padding: 80px 20px 20px; /* Increased top padding to avoid overlap */
    background-color: #E8FAFF;
    overflow-y: auto;
    margin-left: 80px;
}

/* Global Fixes */
html, body {
    overflow-x: hidden; 
    width: 100vw;
}

/* Responsiveness */
@media (max-width: 768px) {
    .sidebar {
        width: 80px; 
    }
    .sidebar img,
    .sidebar .nav-icon {
        width: 40px;
        height: 40px;
    }
    .content {
        padding: 80px 20px;
        margin-left: 80px; 
    }
    .topbar {
        padding: 10px;
        height: 50px; 
    }
}

`;
document.head.appendChild(style); 
