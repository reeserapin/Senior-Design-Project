import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import '../styles/SidePanels.css';

const SidePanels = () => {
  const [isNewsExpanded, setIsNewsExpanded] = useState(true);
  const [isMissingExpanded, setIsMissingExpanded] = useState(true);

  const petNews = {
    title: "The Puppy Timeline: Physical and Mental Changes",
    date: "May 19th, 2025",
    description: "Raising adorable puppies can be as challenging but knowing the general timeline of their growth can help owners prepare to meet a puppy's evolving needs.",
    image: "/pedigree/puppy2.avif"
  };

  const missingPets = [
    {
      name: "Daisy",
      since: "March 19, 2025",
      image: "/pedigree/Mom1.jpeg",
      reward: "CALL: (513) 555-0113"
    }
  ];

  return (
    <div className="sp-side-panels">
      {/* Pet News Panel */}
      <div className="sp-panel pet-news">
        <div 
          className="sp-panel-header"
          onClick={() => setIsNewsExpanded(!isNewsExpanded)}
        >
          <h2 className="sp-panel-title">
            <span className="sp-icon">📰</span> Pet News:
          </h2>
          <span className="sp-toggle-icon">
            {isNewsExpanded ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        </div>
        <div className={`sp-panel-content ${isNewsExpanded ? 'expanded' : ''}`}>
          <div className="sp-news-card">
            <img 
              src={petNews.image} 
              alt={petNews.title} 
              className="sp-news-image"
            />
            <div className="sp-news-content">
              <h3 className="sp-news-title">{petNews.title}</h3>
              <p className="sp-news-date">{petNews.date}</p>
              <p className="sp-news-description">{petNews.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Missing Pets Panel */}
      <div className="sp-panel missing-pets">
        <div 
          className="sp-panel-header"
          onClick={() => setIsMissingExpanded(!isMissingExpanded)}
        >
          <h2 className="sp-panel-title">
            <span className="sp-icon">⚠️</span> Missing Pets
          </h2>
          <span className="sp-toggle-icon">
            {isMissingExpanded ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        </div>
        <div className={`sp-panel-content ${isMissingExpanded ? 'expanded' : ''}`}>
          {missingPets.map((pet, index) => (
            <div key={index} className="sp-missing-pet-card">
              <img 
                src={pet.image} 
                alt={`Missing pet ${pet.name}`} 
                className="sp-missing-pet-image"
              />
              <div className="sp-missing-pet-info">
                <h3 className="sp-missing-pet-name">MISSING PET: {pet.name}</h3>
                <p className="sp-missing-pet-since">SINCE: {pet.since}</p>
                {pet.reward && (
                  <p className="sp-missing-pet-reward">{pet.reward}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidePanels; 