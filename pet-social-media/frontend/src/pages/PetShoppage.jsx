// src/pages/PetShoppage.jsx
import React, { useState } from "react";
import { FaPlus, FaMapMarkerAlt } from "react-icons/fa";
import PetModal from "./PetModal";
import ListPetModal from "./ListPetModal"; // import at top

const pets = [
  {
    id: 1,
    name: "Autumn",
    breed: "British Shorthair",
    age: 2,
    type: "Cat",
    distance: "2.5 miles away",
    image: "/public/golden_retriever_pfp.jpg",
  },
  {
    id: 2,
    name: "Rufus",
    breed: "Shitzu",
    age: 5,
    type: "Dog",
    distance: "4 miles away",
    image: "/public/pedigree/puppy1.jpg",
  },
  {
    id: 3,
    name: "Neo",
    breed: "Turkish Angora",
    age: 2,
    type: "Cat",
    distance: "5.5 miles away",
    image: "/public/kitten_breeder/three_kittens3.jpg",
  },
  {
    id: 4,
    name: "Autumn",
    breed: "British Shorthair",
    age: 2,
    type: "Cat",
    distance: "2.5 miles away",
    image: "/public/golden_retriever_pfp.jpg",
  },
  {
    id: 5,
    name: "Rufus",
    breed: "Shitzu",
    age: 5,
    type: "Dog",
    distance: "4 miles away",
    image: "/public/kitten_breeder/three_kittens2.jpg",
  },
  {
    id: 6,
    name: "Neo",
    breed: "Turkish Angora",
    age: 2,
    type: "Cat",
    distance: "5.5 miles away",
    image: "/public/kitten_breeder/three_kittens2.jpg",
  },
  {
    id: 5,
    name: "Rufus",
    breed: "Shitzu",
    age: 5,
    type: "Dog",
    distance: "4 miles away",
    image: "/public/kitten_breeder/three_kittens2.jpg",
  },
  {
    id: 6,
    name: "Neo",
    breed: "Turkish Angora",
    age: 2,
    type: "Cat",
    distance: "5.5 miles away",
    image: "/public/kitten_breeder/three_kittens2.jpg",
  },
];

const PetShopPage = () => {
  const [search, setSearch] = useState("");
  const [selectedPet, setSelectedPet] = useState(null);
  const [showListModal, setShowListModal] = useState(false); // state


  return (
    <div className="petshop-page">
      <div className="header-bar">
        <h2>PetShelter</h2>
        <button className="list-pet-button" onClick={() => setShowListModal(true)}>
          <FaPlus /> List a Pet
        </button>
      </div>

      <div className="main-content-area">
        <div className="filters-section">

          <div className="filter-group">
          <input
            className="filter-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search pets..."
          />
          </div>

          <h3>Filters</h3>
          <div className="filter-group">
            <label>Species</label>
            <select><option>All</option><option>Cat</option><option>Dog</option></select>
          </div>
          <div className="filter-group">
            <label>Breed</label>
            <input type="text" placeholder="e.g. Poodle" />
          </div>
          <div className="filter-group">
            <label>Age</label>
            <input type="number" placeholder="e.g. 2" />
          </div>
          <div className="filter-group">
            <label>Size</label>
            <select><option>All</option><option>Small</option><option>Medium</option><option>Large</option></select>
          </div>
          <div className="filter-group">
            <label>Gender</label>
            <select><option>All</option><option>Male</option><option>Female</option></select>
          </div>
          <div className="filter-group">
            <label>Location</label>
            <input type="text" placeholder="e.g. Cincinnati" />
          </div>
          <div className="filter-group">
            <label>Sort By</label>
            <select>
              <option>Newest Posted</option>
              <option>Oldest</option>
              <option>Age Ascending</option>
              <option>Age Descending</option>
            </select>
          </div>
        </div>

        <div className="results-section">
          <div className="cards-grid">
            {pets.map((pet) => (
              <div key={pet.id} className="pet-card" onClick={() => setSelectedPet(pet)}>
                <img src={pet.image} alt={pet.name} className="pet-image" />
                <div className="card-info">
                  <div className="top-row">
                    <span className="pet-name">{pet.name}</span>
                    <span className="pet-type-tag">{pet.type}</span>
                  </div>
                  <div className="middle-row">
                    {pet.age} years old • {pet.breed}
                  </div>
                  <div className="bottom-row">
                    <FaMapMarkerAlt className="location-icon" /> {pet.distance}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {selectedPet && (
          <PetModal pet={selectedPet} onClose={() => setSelectedPet(null)} />
        )}
        {showListModal && <ListPetModal onClose={() => setShowListModal(false)} />}
      </div>
    </div>
  );
};

export default PetShopPage;


/* Embedded CSS */
const style = document.createElement('style');
style.innerHTML = `
.petshop-page {
  background-color: #f0fff0;
  padding: 1rem;
  font-family: 'Segoe UI', sans-serif;
}

.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.01rem 2rem;
  background-color: #d5f8c7;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.header-bar h2 {
  font-size: 1.8rem;
  font-weight: bold;
}

.list-pet-button {
  background-color: #000;
  color: #fff;
  border: none;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
}

.main-content-area {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
  background-color: #eaffda; /* ✅ light green fill */
  min-height: calc(100vh - 90px); /* ✅ fills full screen minus header height */
  padding-bottom: 2rem;
}


.filters-section {
  background-color: #fff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.filter-search {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
  margin-bottom: 0.5rem;
}

.filters-section h3 {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-group label {
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
}

.filter-group input,
.filter-group select {
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 0.9rem;
}

.results-section {
  width: 100%;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); /* ✅ dynamic column count */
  gap: 3rem; /* ✅ space between cards in both directions */
  padding: 2rem; /* ✅ space around the whole grid */
}


.pet-card {
  background-color: white;
  border-radius: 10px 10px 10px 10px;
  overflow: hidden;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s;
  padding: 0px;
  height: 480px;
  width:100%;
}

.pet-card:hover {
  transform: translateY(-4px);
}

.pet-image {
  width: 100%;
  height: 70%;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
  padding: 0px;
  box-shadow: none;
}

.card-info {
  padding: 0.8rem 1rem;
}

.top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 1.1rem;
}

.pet-type-tag {
  font-size: 0.75rem;
  background-color: #e0e0e0;
  color: #333;
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  font-weight: 500;
}

.middle-row {
  font-size: 0.9rem;
  color: #555;
  margin-top: 0.3rem;
}

.bottom-row {
  margin-top: 0.4rem;
  font-size: 0.85rem;
  color: #666;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.location-icon {
  color: #333;
}
`;
document.head.appendChild(style);
