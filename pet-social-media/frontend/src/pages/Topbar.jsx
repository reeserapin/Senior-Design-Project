import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/TopAndSide.css';
import AddPetModal from './AddPetModal';
import { FiPlusCircle } from 'react-icons/fi';


function TopBar({ pets, setPets }) {
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
      <div className="left-content">
        <h1 className="logo">Pet-igree</h1>
        {pets.map((pet, index) => (
          <Link to={`/petprofile/${index}`} key={index} className="profile-link">
            <img src={pet.image} alt={pet.name} className="profile-image" />
          </Link>
        ))}
        <div className="plus-icon" onClick={() => setIsPopupOpen(true)}>
          <FiPlusCircle size={36} />
        </div>

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

      {/* ✅ AddPetModal */}
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


