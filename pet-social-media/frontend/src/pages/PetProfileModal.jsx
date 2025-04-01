import React from "react";
import "../styles/PetProfileModal.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Posts from "./Posts";
import { FaEdit } from "react-icons/fa";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { MdAddPhotoAlternate } from "react-icons/md";
import { FaFaceFrown } from "react-icons/fa6";
import { FaSmile } from "react-icons/fa";
import { MdAddAPhoto } from "react-icons/md";
import { FaTree } from "react-icons/fa6";
import { BsHouseHeartFill } from "react-icons/bs";




const PetProfileModal = ({ pet, onClose, editable = false, posts = [], showEditButton = false, onToggleEdit }) => {
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
    lifestyle = {
      goodWithKids: null,
      goodWithPets: null,
      indoorOutdoor: null,
      pottyTrained: null,
    },
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
  const handleDeleteImage = (index) => {
    const updated = [...galleryImages];
    updated.splice(index, 1);
    onHealthUpdate("galleryImages", updated);
  };
  
  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onHealthUpdate("galleryImages", [...(galleryImages || []), reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };
  

  return (
    <div className="pet-profile-overlay" onClick={onClose}>
      <div className="pet-profile-modal" onClick={(e) => e.stopPropagation()}>
      {showEditButton && (
  <button className="edit-button" onClick={onToggleEdit}>
    <FaEdit />
  </button>
)}
{/* Header */}
<div className="pet-header">
  <div className="pet-image-column">
    <div className="pet-image-wrapper">
      <img className="pet-image" src={image} alt={name} />
      {editable && (
        <div
          className="upload-overlay-pet"
          onClick={() =>
            document.getElementById("pet-photo-input").click()
          }
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px"
            }}
          >
            <MdAddAPhoto size={24} />
            <span className="upload-text"></span>
          </div>
          <input
            type="file"
            id="pet-photo-input"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  onHealthUpdate("image", reader.result);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>
      )}
    </div>


    <div className="pet-name-info-wrapper">
            {editable ? (
  <input
    type="text"
    className="pet-edit-input pet-name-input"
    defaultValue={name}
    onBlur={(e) => onHealthUpdate("name", e.target.value)}
  />
) : (
  <h2 className="pet-name">{name}</h2>
)}

            <div className="pet-info-box">
  <p><strong>Breed:</strong>{" "}
    {editable ? (
      <input
        className="pet-edit-input"
        type="text"
        defaultValue={breed}
        onBlur={(e) => onHealthUpdate("breed", e.target.value)}
      />
    ) : (
      breed || "N/A"
    )}
  </p>

  <p><strong>Age:</strong>{" "}
    {editable ? (
      <input
        className="pet-edit-input"
        type="text"
        defaultValue={age}
        onBlur={(e) => onHealthUpdate("age", e.target.value)}
      />
    ) : (
      age || "N/A"
    )}
  </p>

  <p><strong>Gender:</strong>{" "}
    {editable ? (
      <input
        className="pet-edit-input"
        type="text"
        defaultValue={gender}
        onBlur={(e) => onHealthUpdate("gender", e.target.value)}
      />
    ) : (
      gender || "N/A"
    )}
  </p>

  <p><strong>Weight:</strong>{" "}
    {editable ? (
      <input
        className="pet-edit-input"
        type="text"
        defaultValue={weight}
        onBlur={(e) => onHealthUpdate("weight", e.target.value)}
      />
    ) : (
      weight || "N/A"
    )}
  </p>
</div>
</div>

          </div>
          <div className="pet-bio-box">
          <h3 className="bio-title">About {name}:</h3>
{editable ? (
  <textarea
    className="favorite-textarea"
    defaultValue={bio}
    onBlur={(e) => onHealthUpdate("bio", e.target.value)}
    placeholder="Write a short bio..."
  />
) : (
  <p>{bio}</p>
)}

          </div>
        </div>
        <div className="pet-profile-subsection">
  <h4>Photos of {name}</h4>
  <div className="pet-carousel-scroll">
    {galleryImages?.map((img, index) => (
      <div className="scroll-image-wrapper" key={index}>
        <img className="scroll-image" src={img} alt={`Gallery ${index}`} />
        {editable && (
          <button
            className="delete-photo-button"
            onClick={() => handleDeleteImage(index)}
          >
            <IoIosRemoveCircleOutline size={50} color="crimson" />
          </button>
        )}
      </div>
    ))}
    {editable && (
      <div className="upload-photo-wrapper">
        <label className="upload-label">
        <MdAddPhotoAlternate size={40}/>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleUploadImage(e)}
            style={{ display: "none" }}
          />
        </label>
      </div>
    )}
  </div>
</div>

        {/* Posts */}
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

        {/* Adoption Story */}
        {adoptionStory && (
          <div className="pet-profile-subsection">
            <div className="pet-adoption-story">
            <h4>Adoption Story:</h4>
              <p>{adoptionStory}</p>
            </div>
          </div>
        )}

        {/* Health */}
        <div className="pet-health-box">
          <h3>Health History</h3>
          <div className="health-field-row">
            <div>
              <strong>Vaccination Status</strong>
              {editable ? (
                <div className="toggle-options">
                  <button className={vaccinated ? "selected green" : ""} onClick={() => onHealthUpdate("vaccinated", true)}><FaSmile /></button>
                  <button className={!vaccinated ? "selected red" : ""} onClick={() => onHealthUpdate("vaccinated", false)}><FaFaceFrown /></button>
                </div>
              ) : (
                <p>
                {vaccinated === true ? <FaSmile /> : vaccinated === false ? <FaFaceFrown /> : "N/A"}
              </p>

              )}
            </div>
            <div>
              <strong>Spayed/Neutered</strong>
              {editable ? (
                <div className="toggle-options">
                  <button className={spayedNeutered ? "selected green" : ""} onClick={() => onHealthUpdate("spayedNeutered", true)}><FaSmile /></button>
                  <button className={!spayedNeutered ? "selected red" : ""} onClick={() => onHealthUpdate("spayedNeutered", false)}><FaFaceFrown /></button>
                </div>
              ) : (
                <p>
                {spayedNeutered === true ? <FaSmile /> : spayedNeutered === false ? <FaFaceFrown /> : "N/A"}
              </p>

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
              <p>{medicalConditions?.trim() ? medicalConditions : "N/A"}</p>
            )}
          </div>
        </div>

  {/* Personality */}
<div className="pet-profile-subsection personality-box">
  <h4>Personality</h4>

  {/* Temperament */}
<div className="slider-section">
  <label><strong>Temperament</strong></label>
  {editable ? (
  <div className="button-row">
    {[1, 2, 3, 4, 5].map((value) => (
      <button
        key={value}
        className={`rating-button level-${value} ${personality.temperament === value ? "selected" : ""}`}
        onClick={() => onPersonalityUpdate("temperament", value)}
      >
        {value}
      </button>
    ))}
  </div>
) : (
  <div className="button-row">
    {[1, 2, 3, 4, 5].map((value) => (
      <button
        key={value}
        className={`rating-button level-${value} ${
          personality.temperament === value ? "selected" : "not-selected-readonly"
        }`}
        disabled
      >
        {value}
      </button>
    ))}
  </div>
)}

</div>

{/* Energy Level */}
<div className="slider-section">
  <label><strong>Energy Level</strong></label>
  {editable ? (
  <div className="button-row">
    {[1, 2, 3, 4, 5].map((value) => (
      <button
        key={value}
        className={`rating-button level-${value} ${personality.energyLevel === value ? "selected" : ""}`}
        onClick={() => onPersonalityUpdate("energyLevel", value)}
      >
        {value}
      </button>
    ))}
  </div>
) : (
  <div className="button-row">
    {[1, 2, 3, 4, 5].map((value) => (
      <button
        key={value}
        className={`rating-button level-${value} ${
          personality.energyLevel === value ? "selected" : "not-selected-readonly"
        }`}
        disabled
      >
        {value}
      </button>
    ))}
  </div>
)}

</div>

          {/* Favorite Activities */}
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

        {/* Lifestyle Section */}
        {(editable || lifestyle) && (
          <div className="pet-profile-subsection lifestyle-box">
            <h4>Lifestyle</h4>
            {[
  { label: "Good with Kids", field: "goodWithKids" },
  { label: "Good with Other Pets", field: "goodWithPets" },
  { label: "Outdoor or Indoor?", field: "indoorOutdoor" },
  { label: "Potty Trained or Not?", field: "pottyTrained" },
].map(({ label, field }) => (
  <div key={field} className="lifestyle-row">
    <span>{label}</span>

    {editable ? (
      <div className="toggle-options">
        <button
          className={lifestyle[field] === false ? "selected red" : ""}
          onClick={() =>
            onHealthUpdate("lifestyle", {
              ...lifestyle,
              [field]: false,
            })
          }
        >
          {field === "indoorOutdoor" ? <FaTree /> : <FaFaceFrown />}
        </button>
        <button
          className={lifestyle[field] === true ? "selected green" : ""}
          onClick={() =>
            onHealthUpdate("lifestyle", {
              ...lifestyle,
              [field]: true,
            })
          }
        >
          {field === "indoorOutdoor" ? <BsHouseHeartFill /> : <FaSmile />}
        </button>
      </div>
    ) : (
      <span>
        {lifestyle[field] === true ? (
          field === "indoorOutdoor" ? <BsHouseHeartFill /> : <FaSmile />
        ) : lifestyle[field] === false ? (
          field === "indoorOutdoor" ? <FaTree /> : <FaFaceFrown />
        ) : (
          "N/A"
        )}
      </span>
    )}
  </div>
))}

          </div>
        )}

        {/* Care Routine */}
{editable || careRoutine ? (
  <div className="pet-profile-subsection care-box">
    <h4>Care Routine</h4>
    {editable ? (
      <textarea
        className="favorite-textarea"
        defaultValue={careRoutine}
        placeholder="Describe this pet's daily care needs..."
        onBlur={(e) => onHealthUpdate("careRoutine", e.target.value)}
      />
    ) : (
      <p>{careRoutine || "Not provided"}</p>
    )}
  </div>
) : null}


        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PetProfileModal;
