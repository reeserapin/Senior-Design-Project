import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Posts from "./Posts";
import { FaEdit } from "react-icons/fa";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { MdAddPhotoAlternate, MdAddAPhoto } from "react-icons/md";
import { FaFaceFrown } from "react-icons/fa6";
import { FaSmile } from "react-icons/fa";
import { FaTree } from "react-icons/fa6";
import { BsHouseHeartFill } from "react-icons/bs";
import { RiUserFollowLine } from "react-icons/ri";

const PetProfileModal = ({
  pet,
  onClose,
  editable = false,
  posts = [],
  showEditButton = false,
  onToggleEdit,
  isFollowed = false, // initial follow state from parent
  onToggleFollow // callback: (pet, newFollowState) => {}
}) => {
  if (!pet) return null;

  // Local state to manage follow status
  const [followed, setFollowed] = useState(isFollowed);
  const toggleFollow = () => {
    const newFollowState = !followed;
    setFollowed(newFollowState);
    if (onToggleFollow) {
      onToggleFollow(pet, newFollowState);
    }
  };

  // Destructure pet properties
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
              {/* Show follow badge if this pet is from the followed list */}
              {isFollowed && (
                <div className="following-badge" onClick={toggleFollow}>
                  {followed ? (
                    <>
                      <RiUserFollowLine /> Following
                    </>
                  ) : (
                    "Follow"
                  )}
                </div>
              )}
              <img className="pet-image" src={image} alt={name} />
              {editable && (
                <div
                  className="upload-overlay-pet"
                  onClick={() => document.getElementById("pet-photo-input").click()}
                >
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
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
                <p>
                  <strong>Breed:</strong>{" "}
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

                <p>
                  <strong>Age:</strong>{" "}
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

                <p>
                  <strong>Gender:</strong>{" "}
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

                <p>
                  <strong>Weight:</strong>{" "}
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
                  <button className="delete-photo-button" onClick={() => handleDeleteImage(index)}>
                    <IoIosRemoveCircleOutline size={50} color="crimson" />
                  </button>
                )}
              </div>
            ))}
            {editable && (
              <div className="upload-photo-wrapper">
                <label className="upload-label">
                  <MdAddPhotoAlternate size={40} />
                  <input type="file" accept="image/*" onChange={(e) => handleUploadImage(e)} style={{ display: "none" }} />
                </label>
              </div>
            )}
          </div>
        </div>

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
            <div className="pet-adoption-story">
              <h4>Adoption Story:</h4>
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
                  <button className={vaccinated ? "selected green" : ""} onClick={() => onHealthUpdate("vaccinated", true)}>
                    <FaSmile />
                  </button>
                  <button className={!vaccinated ? "selected red" : ""} onClick={() => onHealthUpdate("vaccinated", false)}>
                    <FaFaceFrown />
                  </button>
                </div>
              ) : (
                <p>{vaccinated === true ? <FaSmile /> : vaccinated === false ? <FaFaceFrown /> : "N/A"}</p>
              )}
            </div>
            <div>
              <strong>Spayed/Neutered</strong>
              {editable ? (
                <div className="toggle-options">
                  <button className={spayedNeutered ? "selected green" : ""} onClick={() => onHealthUpdate("spayedNeutered", true)}>
                    <FaSmile />
                  </button>
                  <button className={!spayedNeutered ? "selected red" : ""} onClick={() => onHealthUpdate("spayedNeutered", false)}>
                    <FaFaceFrown />
                  </button>
                </div>
              ) : (
                <p>{spayedNeutered === true ? <FaSmile /> : spayedNeutered === false ? <FaFaceFrown /> : "N/A"}</p>
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

        <div className="pet-profile-subsection personality-box">
          <h4>Personality</h4>
          <div className="slider-section">
            <label>
              <strong>Temperament</strong>
            </label>
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
                    className={`rating-button level-${value} ${personality.temperament === value ? "selected" : "not-selected-readonly"}`}
                    disabled
                  >
                    {value}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="slider-section">
            <label>
              <strong>Energy Level</strong>
            </label>
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

        <div className="pet-profile-subsection extra-info-box">
          <h4>Care Information</h4>
          <div className="pet-profile-subsection">
            <div className="extra-info-fields">
              <div className="info-item">
                <strong>Birthday:</strong>
                {editable ? (
                  <input
                    className="pet-edit-input"
                    type="date"
                    defaultValue={pet.birthday}
                    onBlur={(e) => onHealthUpdate("birthday", e.target.value)}
                  />
                ) : (
                  <p>{pet.birthday || "N/A"}</p>
                )}
              </div>
              <div className="info-item">
                <strong>Adoption Status:</strong>
                {editable ? (
                  <select
                    className="pet-edit-input"
                    defaultValue={pet.adoption_status || ""}
                    onBlur={(e) => onHealthUpdate("adoption_status", e.target.value)}
                  >
                    <option value="">Select Status</option>
                    <option value="Fostering">Fostering</option>
                    <option value="Up for Adoption">Up for Adoption</option>
                    <option value="A Part of My Family">A Part of My Family</option>
                  </select>
                ) : (
                  <p>{pet.adoption_status || "N/A"}</p>
                )}
              </div>
              <div className="info-item">
                <strong>Dietary Preferences:</strong>
                {editable ? (
                  <textarea
                    className="pet-edit-input"
                    defaultValue={pet.dietary_preferences}
                    onBlur={(e) => onHealthUpdate("dietary_preferences", e.target.value)}
                  />
                ) : (
                  <p>{pet.dietary_preferences || "N/A"}</p>
                )}
              </div>
              <div className="info-item">
                <strong>Hobbies:</strong>
                {editable ? (
                  <textarea
                    className="pet-edit-input"
                    defaultValue={pet.hobbies}
                    onBlur={(e) => onHealthUpdate("hobbies", e.target.value)}
                  />
                ) : (
                  <p>{pet.hobbies || "N/A"}</p>
                )}
              </div>
              <div className="info-item">
                <strong>Likes & Dislikes:</strong>
                {editable ? (
                  <textarea
                    className="pet-edit-input"
                    defaultValue={pet.likes_dislikes}
                    onBlur={(e) => onHealthUpdate("likes_dislikes", e.target.value)}
                  />
                ) : (
                  <p>{pet.likes_dislikes || "N/A"}</p>
                )}
              </div>
              <div className="info-item">
                <strong>Vet Info:</strong>
                {editable ? (
                  <textarea
                    className="pet-edit-input"
                    defaultValue={pet.vet_info}
                    onBlur={(e) => onHealthUpdate("vet_info", e.target.value)}
                  />
                ) : (
                  <p>{pet.vet_info || "N/A"}</p>
                )}
              </div>
              <div className="info-item lost-item">
                <strong>Lost?</strong>
                {editable ? (
                  <div className="toggle-options">
                    <button
                      className={pet.lost_status === true ? "selected red" : ""}
                      onClick={() => onHealthUpdate("lost_status", true)}
                    >
                      Yes
                    </button>
                    <button
                      className={pet.lost_status === false ? "selected green" : ""}
                      onClick={() => onHealthUpdate("lost_status", false)}
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <p>{pet.lost_status === true ? "Yes" : pet.lost_status === false ? "No" : "N/A"}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PetProfileModal;




/* Embedded CSS */
const style = document.createElement('style');
style.innerHTML =  `
/* Center the entire block for the lost-item */
.lost-item {
  text-align: center; 
}

/* If you want the buttons specifically centered in the row: */
.lost-item .toggle-options {
  justify-content: center;
}


.extra-info-fields {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* Adjust spacing between items as needed */
}

.extra-info-fields .info-item {
  flex: 1 1 calc(50% - 20px); /* Two columns with a gap */
}

.edit-button {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 40px;
    height: 40px;
    background-color: white;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    z-index: 10;
  }
  
  .edit-button:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.25);
  }
  
  .edit-button svg {
    width: 18px;
    height: 18px;
    color: #333;
  }  
  .pet-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .pet-image-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 0 0 45%;
  }
  
  .pet-image-name {
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* Left align the image and name */
    gap: 10px;
  }
  
  .pet-image {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
  
  .pet-name {
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    margin: 10px 0;
  }
  

  .pet-name-input {
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    border-radius: 10px;
    padding: 6px;
    border: 1px solid #ccc;
    width: 80%;
  }
  
  
  .pet-bio-box {
    background: white;
    padding: 16px;
    border-radius: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    width: 100%;
    margin-right: 90px;
  }

  .pet-info-box {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px 24px;
    margin-left: center;
    margin-right: auto;
    margin-top: 12px;
    max-width: 240px;
    font-size: 14px;
  }

  .pet-name-info-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
  }
  
  
  .pet-info-box p {
    margin: 0;
    text-align: left;
  }
  
  
  .pet-edit-input {
    width: 100%;
    padding: 6px 8px;
    margin-top: 4px;
    font-size: 14px;
    border-radius: 8px;
    border: 1px solid #ccc;
  }
  
  
.pet-profile-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .bio-title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  
  .pet-profile-modal {
    background: #d7f4ff;
    border-radius: 40px;
    width: 90%;
    max-width: 900px;
    max-height: 75vh;
    overflow-y: auto;
    padding: 30px 25px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    position: relative;
    font-family: "Arial", sans-serif;
    z-index: 1100;
  }
  
  .pet-profile-header {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 25px;
  }
  
  .pet-profile-image {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid white;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  }
  
  .pet-profile-name {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 5px;
  }
  
  .bio-box {
    background: white;
    padding: 12px 16px;
    border-radius: 12px;
    margin-bottom: 20px;
    font-size: 14px;
    font-style: italic;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  }
  
  .pet-carousel-scroll {
    display: flex;
    overflow-x: auto;
    padding: 10px;
    gap: 12px;
  }
  
  .scroll-image-wrapper {
    position: relative;
  }
  
  .scroll-image {
    height: 160px;
    border-radius: 20px;
    object-fit: cover;
  }
  
  .delete-photo-button {
  position: absolute;
  top: 8px;
  right: 8px;
  background: transparent;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

  
  .delete-photo-button:hover {
    transform: scale(1.1);
  }
  
  
  .upload-photo-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 180px;
    height: 160px;
    background: #ade788;
    border-radius: 20px;
    cursor: pointer;
    font-size: 2rem;
  }
  
  .upload-label {
    cursor: pointer;
  }
  

  .stat-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    text-align: left;
    margin-bottom: 25px;
    font-size: 14px;
  }
  
  .stat-grid strong {
    display: inline-block;
    width: 120px;
  }
  
  .section {
    background: white;
    padding: 16px 20px;
    border-radius: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    font-size: 14px;
    text-align: left;
  }
  
  .section-title {
    font-weight: bold;
    text-align: center;
    font-size: 16px;
    margin-bottom: 10px;
  }
  
  .lifestyle-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px 20px;
  }
  
  .lifestyle-grid span {
    display: flex;
    align-items: center;
    gap: 8px;

  }
  
  
  .check-icon {
    color: green;
  }
  
  .cross-icon {
    color: red;
  }
  
  .tagged-section {
    margin: 20px 0;
  }
  
  .tagged-title {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 10px;
  }
  
  .tagged-images {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: nowrap;
    overflow-x: auto;
  }
  
  .tagged-images img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 12px;
    border: 2px solid white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .adoption-story {
    font-size: 14px;
    line-height: 1.5;
    text-align: justify;
    margin-top: 8px;
    background: white;
    padding: 16px;
    border-radius: 20px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  }
  
  .close-button {
    background-color: #ff6666;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 20px;
    transition: background-color 0.3s ease;
  }
  
  .close-button:hover {
    background-color: #cc3333;
  }
  
  .pet-carousel {
    width: 100%;
    margin: 30px 0;
  }
  
  .carousel-image-wrapper {
    padding: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 250px
  }
  
  .carousel-image {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 25px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  .pet-carousel-scroll {
    display: flex;
    overflow-x: auto;
    gap: 16px;
    padding: 10px 0;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
  }
  
  .scroll-image-wrapper {
    flex: 0 0 auto;
    scroll-snap-align: start;
    border-radius: 25px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    width: 220px;
    height: 160px;
  }
  
  .scroll-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .pet-posts-section {
    margin-top: 40px;
    text-align: center;
  }
  
  .pet-posts-section h3 {
    margin-bottom: 20px;
    font-size: 22px;
    font-weight: 600;
    color: #333;
  }
  
  .pet-posts-carousel {
    padding: 0 20px;
  }

  .pet-profile-subsection h4 {
    font-size: 20px;
    margin-bottom: 16px;
    text-align: center;
  }
  
  .pet-adoption-story {
    background-color: white;
    padding: 20px 30px;
    margin: 0 auto;
    max-width: 90%;
    border-radius: 20px;
    box-shadow: 0px 4px 12px rgba(0,0,0,0.1);
    font-size: 15px;
    line-height: 1.6;
    text-align: left;
  }
  
  .pet-health-box {
    background-color: white;
    padding: 20px;
    border-radius: 20px;
    margin: 20px auto;
    max-width: 90%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .pet-health-box h3 {
    font-size: 20px;
    margin-bottom: 16px;
    text-align: center;
  }
  
  .health-field-row {
    display: flex;
    justify-content: space-between;
    gap: 40px;
    flex-wrap: wrap;
    margin-bottom: 16px;
  }
  
  .health-field-row > div {
    flex: 1 1 45%;
    text-align: center;
  }
  
  .toggle-options {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 8px;
  }
  
  .toggle-options button {
    font-size: 20px;
    padding: 6px 14px;
    border-radius: 6px;
    border: 1px solid #ccc;
    background-color: #f0f0f0;
    cursor: pointer;
    transition: background 0.2s ease;
  }
  
  .toggle-options button.selected {
    background-color: #b2f2bb;
    border-color: #38a169;
  }
  
  .medical-section {
    text-align: center;
    margin-top: 20px;
  }
  
  .medical-textarea {
    width: 80%;
    min-height: 60px;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
    margin-top: 8px;
    resize: vertical;
  }
  
  /* Personality Section */
.personality-box {
    background-color: white;
    padding: 20px;
    border-radius: 20px;
    margin: 20px auto;
    max-width: 90%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .slider-section {
    margin-bottom: 24px;
  }
  
  .slider-label-row {
    display: flex;
    justify-content: space-between;
    margin: 4px 8px 0;
    font-size: 18px;
  }
  
  .slider-label-row span {
    flex: 1;
    text-align: center;
  }
  
  .slider-wrapper {
    margin-top: 8px;
    position: relative;
  }
  
  input[type="range"] {
    width: 100%;
    -webkit-appearance: none;
    height: 6px;
    background: black;
    border-radius: 5px;
    margin: 8px 0;
  }
  
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 18px;
    width: 18px;
    border-radius: 50%;
    background: #4caf50;
    cursor: pointer;
    margin-top: -6px;
  }
  
  input[type="range"]::-moz-range-thumb {
    height: 18px;
    width: 18px;
    border-radius: 50%;
    background: #4caf50;
    cursor: pointer;
  }
  
  
  .favorite-textarea {
    width: 90%;
    height: 100px;
    padding: 10px;
    border-radius: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    resize: none;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
  


  .lifestyle-box {
    background-color: white;
    padding: 20px;
    border-radius: 20px;
    margin: 20px auto;
    max-width: 90%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    text-align: left;
  }
  
  .lifestyle-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    font-size: 15px;
    font-weight: 500;
  }
  
  .lifestyle-row span:first-child {
    flex: 1;
  }
  
  .lifestyle-box .toggle-options {
    display: flex;
    gap: 10px;
  }
  
  .toggle-options button.red {
    background-color: #fbd3d3;
  }
  
  .toggle-options button.green {
    background-color: #d0f5d8;
  }
  
  .care-box {
    background-color: white;
    padding: 20px;
    border-radius: 20px;
    margin: 20px auto;
    max-width: 100%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    text-align: left;
    font-size: 15px;
    line-height: 1.6;
  }
  
.pet-profile-subsection.care-box {
  background-color: white;
  padding: 20px;
  border-radius: 20px;
  margin: 20px auto;
  max-width: 90%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}


  .not-selected-readonly {
    filter: grayscale(100%) brightness(1.1);
    opacity: 0.6;
  }  
  
  .button-row {
    display: flex;
    gap: 16px;
    justify-content: center;
    margin-top: 12px;
  }
  
  .rating-button {
    width: 40px;
    height: 40px;
    font-weight: bold;
    border-radius: 50%;
    margin: 4px;
    border: none;
    color: white;
    font-size: 16px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease;
  }
  
  .rating-button:disabled {
    cursor: default;
    opacity: 0.9;
  }
  
  .rating-button.level-1 {
    background: linear-gradient(to bottom right, #72c6ef, #5a9be1);
  }
  
  .rating-button.level-2 {
    background: linear-gradient(to bottom right, #63e2f0, #50c4d3);
  }
  
  .rating-button.level-3 {
    background: linear-gradient(to bottom right, #90e66c, #63cc4e);
  }
  
  .rating-button.level-4 {
    background: linear-gradient(to bottom right, #ffd76e, #ffc93c);
  }
  
  .rating-button.level-5 {
    background: linear-gradient(to bottom right, #ff6868, #ff4e4e);
  }
  
  .rating-button.selected {
    box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.2);
  }
  
.following-badge {
  position: absolute;
  top: 8px;    /* adjust as needed */
  left: -120px; /* adjust as needed */
  background-color: #ffffff;
  color: #333;
  font-size: 14px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

  .pet-image-wrapper {
    position: relative;
    width: 150px;
    height: 150px;
    margin: 0 auto;
  }
  
  .pet-image {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .upload-overlay-pet {
    position: absolute;
    top: 0;
    left: 0;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  
  .pet-image-wrapper:hover .upload-overlay-pet {
    opacity: 1;
  }
  
  .upload-text {
    pointer-events: none;
  }
  
.extra-info-fields .info-item input,
.extra-info-fields .info-item textarea {
  width: 100%;
  padding: 6px 10px;
  margin-top: 6px;
  border-radius: 8px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-size: 14px;
  resize: vertical;
}
.extra-info-fields .info-item select {
  width: 100%;
  padding: 6px 10px;
  margin-top: 6px;
  border-radius: 8px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-size: 14px;
  background: white;
}

.extra-info-box {
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  margin: 20px auto;
  max-width: 90%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
}


`;
document.head.appendChild(style); 
