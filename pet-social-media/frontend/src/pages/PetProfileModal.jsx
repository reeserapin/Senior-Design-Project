
import React from "react";
import "../styles/PetProfileModal.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Posts from "./Posts";

const PetProfileModal = ({ pet, onClose, editable = false, posts = [] }) => {
  if (!pet) return null;

  const {
    name = "Unknown",
    image,
    breed,
    age,
    gender,
    weight,
    vaccinated,
    spayedNeutered,
    medicalConditions,
    personality = {},
    lifestyle,
    favoriteActivities,
    careRoutine,
    bio,
    galleryImages,
    adoptionStory,
    onHealthUpdate = () => {},
    onPersonalityUpdate = () => {},
  } = pet;

  const handleSliderChange = (field, value) => {
    onPersonalityUpdate(field, parseInt(value));
  };

  return (
    <div className="pet-profile-overlay" onClick={onClose}>
      <div className="pet-profile-modal" onClick={(e) => e.stopPropagation()}>
        <div className="pet-header">
          <div className="pet-image-column">
            <img className="pet-image" src={image} alt={name} />
            <h2 className="pet-name">{name}</h2>
            <div className="pet-info-box">
              <p><strong>Breed:</strong> {breed || "N/A"}</p>
              <p><strong>Age:</strong> {age || "N/A"}</p>
              <p><strong>Gender:</strong> {gender || "N/A"}</p>
              <p><strong>Weight:</strong> {weight || "N/A"}</p>
            </div>
          </div>
          <div className="pet-bio-box">
            <h3 className="bio-title">About {name}:</h3>
            <p>{bio}</p>
          </div>
        </div>

        {galleryImages?.length > 0 && (
          <>
            <p><strong>Photos of {name}</strong></p>
            <div className="pet-carousel-scroll">
              {galleryImages.map((img, index) => (
                <div className="scroll-image-wrapper" key={index}>
                  <img className="scroll-image" src={img} alt={`Gallery ${index}`} />
                </div>
              ))}
            </div>
          </>
        )}

        {posts.length > 0 && (
          <div className="pet-profile-subsection">
            <h4>{`Posts Featuring ${name}`}</h4>
            <Posts
              postImages={posts.map((p) => p.images)}
              captions={posts.map((p) => p.caption)}
              isCarousel={true}
            />
          </div>
        )}

        {adoptionStory && (
          <div className="pet-profile-subsection">
            <h4>Adoption Story:</h4>
            <div className="pet-adoption-story">
              <p>{adoptionStory}</p>
            </div>
          </div>
        )}

        <div className="pet-health-box">
          <h3>Health History</h3>
          <div className="health-field-row">
            <div>
              <strong>Vaccination Status</strong>
              {editable ? (
                <div className="toggle-options">
                  <button
                    className={vaccinated ? "selected" : ""}
                    onClick={() => onHealthUpdate("vaccinated", true)}
                  >
                    ✅
                  </button>
                  <button
                    className={!vaccinated ? "selected" : ""}
                    onClick={() => onHealthUpdate("vaccinated", false)}
                  >
                    ❌
                  </button>
                </div>
              ) : (
                <p>{vaccinated ? "✅ Yes" : "❌ No"}</p>
              )}
            </div>

            <div>
              <strong>Spayed/Neutered</strong>
              {editable ? (
                <div className="toggle-options">
                  <button
                    className={spayedNeutered ? "selected" : ""}
                    onClick={() => onHealthUpdate("spayedNeutered", true)}
                  >
                    ✅
                  </button>
                  <button
                    className={!spayedNeutered ? "selected" : ""}
                    onClick={() => onHealthUpdate("spayedNeutered", false)}
                  >
                    ❌
                  </button>
                </div>
              ) : (
                <p>{spayedNeutered ? "✅ Yes" : "❌ No"}</p>
              )}
            </div>
          </div>

          <div className="medical-section">
            <strong>Medical Conditions</strong>
            {editable ? (
              <textarea
                className="medical-textarea"
                defaultValue={medicalConditions}
                placeholder="Enter any medical conditions..."
                onBlur={(e) => onHealthUpdate("medicalConditions", e.target.value)}
              />
            ) : (
              <p>{medicalConditions || "None"}</p>
            )}
          </div>
        </div>

        <div className="pet-profile-subsection personality-box">
  <h4>Personality</h4>

  {/* Temperament */}
  <div className="slider-section">
    <label htmlFor="temperament"><strong>Temperament</strong></label>
    <div className="slider-wrapper">
      <input
        id="temperament"
        type="range"
        min="1"
        max="10"
        value={personality.temperament || 5}
        disabled={!editable}
        onChange={(e) => handleSliderChange("temperament", e.target.value)}
      />
      <div className="slider-label-row">
        <span>😐</span>
        <span>😆</span>
      </div>
    </div>
  </div>

  {/* Energy Level */}
  <div className="slider-section">
    <label htmlFor="energyLevel"><strong>Energy Level</strong></label>
    <div className="slider-wrapper">
      <input
        id="energyLevel"
        type="range"
        min="1"
        max="10"
        value={personality.energyLevel || 5}
        disabled={!editable}
        onChange={(e) => handleSliderChange("energyLevel", e.target.value)}
      />
      <div className="slider-label-row">
        <span>😴</span>
        <span>🏃‍♂️</span>
      </div>
    </div>
  </div>

  <div className="pet-profile-subsection">
  <h4>Favorite Activities</h4>
  {editable ? (
    <textarea
      className="favorite-textarea"
      defaultValue={favoriteActivities}
      placeholder="Enter favorite activities..."
      onBlur={(e) => onHealthUpdate("favoriteActivities", e.target.value)}
    />
  ) : (
    <p>{favoriteActivities || "Not provided"}</p>
  )}
</div>

</div>


        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PetProfileModal;
