import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AddPetModal from './AddPetModal';
import { FiPlusCircle, FiSearch } from 'react-icons/fi';
import { TextField, InputAdornment, Paper, Box } from '@mui/material';
import { GiCrossedBones } from 'react-icons/gi';


function TopBar({ pets, setPets, setActivePet }) {
  const [query, setQuery] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const searchRef = useRef(null);
  const location = useLocation();
  const isLoginPage = location.pathname === '/';
  const isSignupPage = location.pathname === '/signup';
  const isAuthPage = isLoginPage || isSignupPage;

  // Sample search categories and items for the dropdown
  const sampleSearchItems = {
    pets: ['Cats', 'Dogs', 'Birds', 'Rabbits'],
    products: ['Food', 'Toys', 'Accessories', 'Grooming'],
    services: ['Veterinarians', 'Grooming Services', 'Pet Sitters', 'Trainers']
  };

  useEffect(() => {
    // Close dropdown when clicking outside
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
        setNoResults(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    if (!query.trim()) return;
    
    // Filter search results based on query
    const results = {};
    Object.entries(sampleSearchItems).forEach(([category, items]) => {
      const filtered = items.filter(item => 
        item.toLowerCase().includes(query.toLowerCase())
      );
      if (filtered.length > 0) {
        results[category] = filtered;
      }
    });
    
    setSearchResults(results);
    
    // If no results, show no results message in dropdown
    if (Object.keys(results).length === 0) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }
    
    setShowDropdown(true);
  };

  const handleSearchItemClick = (item) => {
    setQuery(item);
    setShowDropdown(false);
    // Navigate or perform action with the selected item
    // (removed alert, would normally navigate to a page or perform an action)
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length > 2) {
      handleSearch();
    } else {
      setShowDropdown(false);
      setNoResults(false);
    }
  };

  const handleAddPet = (newPet) => {
    setPets([...pets, newPet]);
    setIsPopupOpen(false);
  };

  return (
    <div className={`ts-topbar ${isAuthPage ? 'auth-page' : ''}`}>
      <div className="ts-left-content">
        <h1 className="ts-logo">Pet-igree</h1>
        
        {!isAuthPage && (
          <>
            {pets.map((pet, index) => (
  <button
    key={index}
    className="profile-link"
    onClick={() =>
      setActivePet({
        ...pet,
        isOwnPet: true, // ✅ Add this line
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


<div className="ts-plus-icon-wrapper" onClick={() => setIsPopupOpen(true)}>
  <GiCrossedBones size={26} style={{ transform: "rotate(45deg)" }} />
</div>


            
          </>
        )}
      </div>
      
      {!isAuthPage && (
        <div className="ts-search-container" ref={searchRef}>
<Paper
  sx={{
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // more visible
    borderRadius: '30px',
    padding: '6px 20px 6px 10px',
    display: 'flex',
    mr: 4, 
    alignItems: 'center',
    width: '100%',
    boxShadow: '0 0 8px rgba(0,0,0,0.2)', // adds a subtle glow
  }}
  elevation={3}
>
  <TextField
    fullWidth
    variant="standard"
    placeholder="Search pets, products, services..."
    value={query}
    onChange={handleInputChange}
    onKeyPress={(e) => {
      if (e.key === 'Enter') handleSearch();
    }}
    onFocus={() => query.length > 2 && handleSearch()}
    InputProps={{
      disableUnderline: true,
      startAdornment: (
        <InputAdornment position="start">
          <FiSearch style={{ color: 'black', fontSize: '20px' }} />
        </InputAdornment>
      ),
      style: {
        color: 'black',
        fontSize: '16px',
        fontWeight: 500,
      },
    }}
    inputProps={{
      style: {
        padding: '8px 0',
      },
    }}
    sx={{
      '& .MuiInputBase-input::placeholder': {
        color: 'black',
        opacity: 1,
        fontSize: '16px',
      },
    }}
  />
</Paper>


          
          {showDropdown && (
            <div className="ts-search-dropdown">
              {noResults ? (
                <div className="ts-search-no-results">
                  <p>No results found for: "{query}"</p>
                </div>
              ) : (
                Object.entries(searchResults).map(([category, items]) => (
                  <div key={category} className="ts-search-category">
                    <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                    <ul>
                      {items.map((item, index) => (
                        <li 
                          key={index} 
                          onClick={() => handleSearchItemClick(item)}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}

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

/* New Search Bar Styles */
.ts-search-container {
  position: relative;
  margin-left: auto;
  margin-right: 80px;
  width: 300px;
}

.ts-search-wrapper {
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 8px 16px;
  transition: all 0.3s ease;
}

.ts-search-wrapper:hover, .ts-search-wrapper:focus-within {
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}

.ts-search-icon {
  color: white;
  margin-right: 8px;
  font-size: 18px;
}

.ts-search-input {
  background: transparent;
  border: none;
  color: white;
  font-size: 14px;
  outline: none;
  width: 100%;
  padding: 0;
}

.ts-search-input::placeholder {
  color: rgba(255, 255, 255, 0.8);
}

/* Search Dropdown Styles */
.ts-search-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin-top: 8px;
  max-height: 400px;
  overflow-y: auto;
  z-index: 1000;
}

.ts-search-category {
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
}

.ts-search-category:last-child {
  border-bottom: none;
}

.ts-search-category h4 {
  color: #099EC8;
  margin: 0 0 8px 0;
  font-size: 14px;
}

.ts-search-category ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.ts-search-category li {
  padding: 6px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 14px;
  color: #333;
}

.ts-search-category li:hover {
  background-color: #f0f8ff;
}

.ts-search-no-results {
  padding: 12px 16px;
  color: #777;
  font-size: 14px;
  text-align: center;
}

.ts-topbar {
  background-color: #099EC8;
  color: white;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

/* Special styling for auth pages */
.ts-topbar.auth-page {
  justify-content: flex-start;
}

.ts-topbar.auth-page .ts-left-content {
  justify-content: flex-start;
  width: auto;
}

.ts-topbar.auth-page .ts-logo {
  text-align: left;
  padding-right: 15px;
}

.ts-sidebar.auth-page {
  background-color: #9DD8EA;
  width: 70px;
  height: calc(100vh - 60px);
  position: fixed;
  top: 60px;
  left: 0;
  z-index: 999;
}

/* Content adjustment for auth pages */
.auth-page ~ .content {
  margin-left: 70px;
}

.ts-left-content {
  display: flex;
  align-items: center;
  gap: 15px;
}

.ts-logo {
  font-size: 29px;
  font-weight: bold;
  margin: 0;
  padding-right: 15px;
}

.ts-profile-image {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px #716563;
  transition: all 0.3s ease;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
}

.ts-plus-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
}

.ts-plus-icon:hover {
  transform: scale(1.2);
}

.ts-plus-icon-wrapper {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8); /* semi-transparent white */
  border: 1px solid white; /* match pet image border */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
  margin: 0 6px; /* match spacing used in .profile-link */
}

.ts-plus-icon-wrapper:hover {
  transform: scale(1.1);
  border: 2px solid yellow;
}

.ts-plus-icon-wrapper svg {
  color: black;
  width: 20px;
  height: 20px;
}



/* Animation for pet images */
.profile-link:hover .ts-profile-image {
  transform: scale(1.15);
  border-color: #ffd700;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

/* Additional animation effect */
@keyframes pulse {
  0% { border-color: white; }
  50% { border-color: #ffd700; }
  100% { border-color: white; }
}

.profile-link:active .ts-profile-image {
  animation: pulse 0.5s;
}

`;
document.head.appendChild(style); 
