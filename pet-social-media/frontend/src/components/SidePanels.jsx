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
    <div className="side-panels">
      {/* Pet News Panel */}
      <div className="panel pet-news">
        <div 
          className="panel-header"
          onClick={() => setIsNewsExpanded(!isNewsExpanded)}
        >
          <h2 className="panel-title">
            <span className="icon">📰</span> Pet News:
          </h2>
          <span className="toggle-icon">
            {isNewsExpanded ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        </div>
        <div className={`panel-content ${isNewsExpanded ? 'expanded' : ''}`}>
          <div className="news-card">
            <img 
              src={petNews.image} 
              alt={petNews.title} 
              className="news-image"
            />
            <div className="news-content">
              <h3 className="news-title">{petNews.title}</h3>
              <p className="news-date">{petNews.date}</p>
              <p className="news-description">{petNews.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Missing Pets Panel */}
      <div className="panel missing-pets">
        <div 
          className="panel-header"
          onClick={() => setIsMissingExpanded(!isMissingExpanded)}
        >
          <h2 className="panel-title">
            <span className="icon">⚠️</span> Missing Pets
          </h2>
          <span className="toggle-icon">
            {isMissingExpanded ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        </div>
        <div className={`panel-content ${isMissingExpanded ? 'expanded' : ''}`}>
          {missingPets.map((pet, index) => (
            <div key={index} className="missing-pet-card">
              <img 
                src={pet.image} 
                alt={`Missing pet ${pet.name}`} 
                className="missing-pet-image"
              />
              <div className="missing-pet-info">
                <h3 className="missing-pet-name">MISSING PET: {pet.name}</h3>
                <p className="missing-pet-since">SINCE: {pet.since}</p>
                {pet.reward && (
                  <p className="missing-pet-reward">{pet.reward}</p>
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