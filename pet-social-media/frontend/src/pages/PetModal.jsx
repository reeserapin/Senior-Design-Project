import React, { useEffect } from "react";
import { FaPhoneAlt, FaEnvelope, FaHeart, FaTimes } from "react-icons/fa";

const PetModal = ({ pet, onClose }) => {
  if (!pet) return null;

  // Optional: Lock background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("petmodal-overlay")) {
      onClose();
    }
  };

  return (
    <>
      <style>{`
        .petmodal-overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.45);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .petmodal-content {
          background: #fff;
          padding: 2rem;
          border-radius: 16px;
          max-width: 1000px;
          width: 90%;
          position: relative;
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }

        .petmodal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          font-size: 1.4rem;
          background: none;
          border: none;
          cursor: pointer;
        }

        .petmodal-header h2 {
          margin-bottom: 1rem;
        }

        .petmodal-body {
          display: flex;
          gap: 2rem;
          margin-top: 1rem;
          flex-wrap: wrap;
        }

        .petmodal-image-section {
          flex: 1;
          background: #f0f0f0;
          padding: 1rem;
          border-radius: 12px;
        }

        .petmodal-main-image {
          width: 100%;
          border-radius: 8px;
          border: 2px solid #ccc;
        }

        .petmodal-thumbnail-row {
          display: flex;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .petmodal-thumbnail {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 6px;
          border: 1px solid #ccc;
        }

        .petmodal-add-more {
          width: 60px;
          height: 60px;
          background: #ddd;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          border-radius: 6px;
        }

        .petmodal-info-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .petmodal-badges {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .petmodal-badge {
          background: #eee;
          padding: 0.3rem 0.7rem;
          border-radius: 1rem;
          font-size: 0.8rem;
        }

        .petmodal-about p {
          margin-top: 0.4rem;
          line-height: 1.4;
        }

        .petmodal-shelter-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .petmodal-shelter-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .petmodal-shelter-name {
          font-weight: bold;
        }

        .petmodal-action {
          padding: 0.6rem 1rem;
          font-size: 0.9rem;
          border-radius: 6px;
          border: 1px solid #ccc;
          background: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .petmodal-action.petmodal-primary {
          background: black;
          color: white;
          border: none;
        }

        .petmodal-additional-details h4 {
          margin-top: 1rem;
        }

        .petmodal-details-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          font-size: 0.9rem;
        }
      `}</style>

      <div className="petmodal-overlay" onClick={handleBackdropClick}>
        <div className="petmodal-content">
          <button className="petmodal-close" onClick={onClose}><FaTimes /></button>

          <div className="petmodal-header">
            <h2>{pet.name} - {pet.title || "Playful " + pet.breed}</h2>
          </div>

          <div className="petmodal-body">
            {/* Left side: image & thumbnails */}
            <div className="petmodal-image-section">
              <img className="petmodal-main-image" src={pet.image} alt={pet.name} />
              <div className="petmodal-thumbnail-row">
                {pet.gallery?.map((img, i) => (
                  <img key={i} className="petmodal-thumbnail" src={img} alt={`Gallery ${i}`} />
                ))}
                <div className="petmodal-add-more">+</div>
              </div>
            </div>

            {/* Right side: badges, info, shelter, buttons */}
            <div className="petmodal-info-section">
              <div className="petmodal-badges">
                <span className="petmodal-badge">{pet.age} Years Old</span>
                <span className="petmodal-badge">{pet.gender || "Female"}</span>
                <span className="petmodal-badge">{pet.status || "Vaccinated"}</span>
              </div>

              <div className="petmodal-about">
                <h4>About {pet.name}</h4>
                <p>{pet.description || "This is a lovely and playful pet waiting for a forever home!"}</p>
              </div>

              <hr />

              <div className="petmodal-shelter-info">
                <img src={pet.shelterImg || "/public/linkedGIRl.jpg"} alt="Shelter" className="petmodal-shelter-avatar" />
                <div>
                  <p className="petmodal-shelter-name">{pet.shelter || "Happy Paws Shelter"}</p>
                  <p className="petmodal-shelter-location">{pet.address || "123 Pet Street, New York"}</p>
                </div>
              </div>

              <button className="petmodal-action petmodal-primary"><FaPhoneAlt /> Contact Shelter</button>
              <button className="petmodal-action"><FaEnvelope /> Send Message</button>
              <button className="petmodal-action"><FaHeart /> Save to Favorites</button>

              <div className="petmodal-additional-details">
                <h4>Additional Details</h4>
                <div className="petmodal-details-grid">
                  <div><strong>Breed</strong><p>{pet.breed}</p></div>
                  <div><strong>Size</strong><p>{pet.size || "Medium"}</p></div>
                  <div><strong>Weight</strong><p>{pet.weight || "50 lbs"}</p></div>
                  <div><strong>Color</strong><p>{pet.color || "Golden"}</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PetModal;
