import React, { useState } from "react";
import { FaChevronUp, FaChevronDown, FaNewspaper, FaSearch, FaTimes } from "react-icons/fa";
import "../styles/SidePanels.css";

const NewsCard = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`sp-news-card ${expanded ? "expanded" : ""}`} onClick={() => !expanded && setExpanded(true)}>
      <img src={item.image} alt="news" className={`sp-news-image ${expanded ? "large" : ""}`} />
      <div className="sp-news-content">
        <div className="sp-news-title">{item.title}</div>
        <div className="sp-news-description">{item.summary}</div>
        {expanded && (
          <div className="sp-news-extra">
            <p>{item.details}</p>
            <FaTimes className="sp-close-icon" onClick={(e) => { e.stopPropagation(); setExpanded(false); }} />
          </div>
        )}
      </div>
    </div>
  );
};

const MissingPetCard = ({ pet }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`sp-missing-pet-card ${expanded ? "expanded" : ""}`} onClick={() => !expanded && setExpanded(true)}>
      <img src={pet.image} alt="missing pet" className={`sp-missing-pet-image ${expanded ? "large" : ""}`} />
      <div className="sp-missing-pet-info">
        <div className="sp-missing-pet-name">{pet.name}</div>
        <div className="sp-missing-pet-since">{pet.location}</div>
        <div className="sp-missing-pet-reward">{pet.reward}</div>
        {expanded && (
          <div className="sp-missing-extra">
            <p>{pet.details}</p>
            <FaTimes className="sp-close-icon" onClick={(e) => { e.stopPropagation(); setExpanded(false); }} />
          </div>
        )}
      </div>
    </div>
  );
};

const SidePanels = () => {
  const [showNews, setShowNews] = useState(false);
  const [showMissing, setShowMissing] = useState(false);

  const newsItems = [
    {
      title: "📰 New Adoption Center!",
      summary: "Opened last week in Cincinnati...",
      details: "The new adoption center has over 50 animals and operates 7 days a week. They also offer free starter kits to new adopters!",
      image: "/public/side-shelter.png"
    },
    {
      title: "🐶 Puppy Prep Tips",
      summary: "Everything you need to know...",
      details: "From chew-proofing your home to setting up feeding routines, here's how to welcome your pup.",
      image: "/public/side-dog.png"
    }
  ];

  const missingPets = [
    {
      name: "🚨 Milo (Golden Retriever)",
      location: "Last seen near Hyde Park",
      reward: "Reward: $100",
      details: "Milo is very friendly and was last wearing a blue collar. Please contact if seen!",
      image: "/public/side-retriever.png"
    },
    {
      name: "📢 Bella (Grey Tabby)",
      location: "Missing from Westwood",
      reward: "Reward: $50",
      details: "Bella is shy and may hide under decks or porches. She responds to treats and soft whistles.",
      image: "/public/side-tabby.png"
    }
  ];

  return (
    <div className="sp-side-panels">
      {/* Pet News */}
      <div className="sp-panel">
        <div className="sp-panel-header" onClick={() => setShowNews(!showNews)}>
          <div className="sp-panel-title">
            <FaNewspaper className="sp-icon" />
            <span>Pet News</span>
          </div>
          {showNews ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        <div className={`sp-panel-content ${showNews ? "expanded" : ""}`}>
          {newsItems.map((item, i) => (
            <NewsCard key={i} item={item} />
          ))}
        </div>
      </div>

      {/* Missing Pets */}
      <div className="sp-panel">
        <div className="sp-panel-header" onClick={() => setShowMissing(!showMissing)}>
          <div className="sp-panel-title">
            <FaSearch className="sp-icon" />
            <span>Missing Pets</span>
          </div>
          {showMissing ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        <div className={`sp-panel-content ${showMissing ? "expanded" : ""}`}>
          {missingPets.map((pet, i) => (
            <MissingPetCard key={i} pet={pet} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidePanels;
