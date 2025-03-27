import React from "react";
import "../styles/PetProfileModal.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const PetProfileModal = ({ pet, onClose, editable = false }) => {
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
    personality,
    lifestyle,
    favoriteActivities,
    careRoutine,
    bio,
    taggedImages = [],
  } = pet;

  return (
    

    <div className="pet-profile-overlay" onClick={onClose}>
      <div className="pet-profile-modal" onClick={(e) => e.stopPropagation()}>
      <div className="pet-header">
  <div className="pet-image-column">
    <img className="pet-image" src={pet.image} alt={pet.name} />
    <h2 className="pet-name">{pet.name}</h2>

    {/* 🔥 New Info Box */}
    <div className="pet-info-box">
      <p><strong>Breed:</strong> {breed || "N/A"}</p>
      <p><strong>Age:</strong> {age || "N/A"}</p>
      <p><strong>Gender:</strong> {gender || "N/A"}</p>
      <p><strong>Weight:</strong> {weight || "N/A"}</p>
    </div>
  </div>

  <div className="pet-bio-box">
  <h3 className="bio-title">About {pet.name}:</h3>
  <p>{bio}</p>
</div>
</div> 

{pet.galleryImages?.length > 0 && (
  <div className="pet-carousel-scroll">
    {pet.galleryImages.map((img, index) => (
      <div className="scroll-image-wrapper" key={index}>
        <img className="scroll-image" src={img} alt={`Gallery ${index}`} />
      </div>
    ))}
  </div>
)}










<div className="pet-profile-details">
  <p><strong>Vaccinated:</strong> {vaccinated ? "Yes" : "No"}</p>
  <p><strong>Spayed/Neutered:</strong> {spayedNeutered ? "Yes" : "No"}</p>
  {medicalConditions && (
    <p><strong>Medical Conditions:</strong> {medicalConditions}</p>
  )}
</div>
        
       

        {personality && (
          <div className="pet-profile-subsection">
            <h4>Personality</h4>
            <p><strong>Temperament:</strong> {personality.temperament || "N/A"}</p>
            <p><strong>Energy:</strong> {personality.energyLevel || "N/A"}</p>
          </div>
        )}

        {lifestyle && (
          <div className="pet-profile-subsection">
            <h4>Lifestyle</h4>
            <p><strong>Good with Kids:</strong> {lifestyle.goodWithKids ? "Yes" : "No"}</p>
            <p><strong>Good with Pets:</strong> {lifestyle.goodWithPets ? "Yes" : "No"}</p>
            <p><strong>Indoor/Outdoor:</strong> {lifestyle.indoorOutdoor}</p>
            <p><strong>Potty Trained:</strong> {lifestyle.pottyTrained ? "Yes" : "No"}</p>
            <p><strong>Crate Trained:</strong> {lifestyle.crateTrained ? "Yes" : "No"}</p>
          </div>
        )}

        {favoriteActivities && (
          <div className="pet-profile-subsection">
            <h4>Favorite Activities</h4>
            <p>{favoriteActivities}</p>
          </div>
        )}

        {careRoutine && (
          <div className="pet-profile-subsection">
            <h4>Care Routine</h4>
            <p>{careRoutine}</p>
          </div>
        )}

        {taggedImages.length > 0 && (
          <div className="pet-tagged-images">
            <h4>Tagged Posts</h4>
            <div className="tagged-img-gallery">
              {taggedImages.map((img, index) => (
                <img key={index} src={img} alt={`tagged-${index}`} />
              ))}
            </div>
          </div>
        )}

        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PetProfileModal;
