import React, { useState, useRef } from "react";
import Cropper from "react-easy-crop";
import Sidebar from "../Sidebar";
import "../styles/Profilepage.css";

function ProfilePage() {
  const [banner, setBanner] = useState(null);
  const [cropping, setCropping] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(null);
  const profileFileInputRef = useRef(null);
  const [bio, setBio] = useState("Update Bio.");
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [activePet, setActivePet] = useState(null);
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -150, behavior: "smooth" });
  };
  
  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 150, behavior: "smooth" });
  };
  
  const followedPets = [
    { name: "Millie", image: "/millie.jpg" },
    { name: "Milo", image: "/milo.jpg" },
    { name: "Burrito", image: "/burrito.jpg" },
    { name: "Autumn", image: "/autumn.jpg" },
    { name: "Luna", image: "/luna.jpg" },
    { name: "Donut", image: "/donut.jpg" },
    { name: "Buddy", image: "/buddy.jpg" },
    { name: "Nala", image: "/nala.jpg" }
  ];
  

const pets = [
  {
    name: "Sparky",
    image: "/pets/sparky.jpg",
    description: "Sparky loves running in the park and chasing tennis balls."
  },
  {
    name: "Spot",
    image: "/pets/spot.jpg",
    description: "Spot is a goofy pup who loves cuddles and treats."
  },
  {
    name: "Snowy",
    image: "/pets/snowy.jpg",
    description: "Snowy is the quietest and fluffiest kitten you'll meet!"
  }
];


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setBanner(reader.result);
      reader.readAsDataURL(file);
      setCropping(true);
    }
  };

  const handleCropComplete = (_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  };

  const handleApplyCrop = () => {
    setCropping(false);
    // You could add canvas logic here if you want to crop the image manually
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-container">
      <Sidebar />
      <main className="profile-main">
        <div className="profile-banner-container">
          <div className="profile-banner">
            
            {banner ? (
              <img src={banner} alt="Banner" className="banner-image" />
            ) : (
              <p>Upload a banner</p>
            )}
            <button className="upload-button" onClick={() => fileInputRef.current.click()}>
              Upload
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>

          <div className="profile-stats">
  <div className="stat-circle">
    <div className="stat-number">20.3K</div>
    <div className="stat-label">Followers</div>
  </div>
  <div className="stat-circle">
    <div className="stat-number">489</div>
    <div className="stat-label">Following</div>
  </div>
  <div className="stat-circle">
    <div className="stat-number">308</div>
    <div className="stat-label">Posts</div>
  </div>
</div>



          <div className="profile-photo-container">
            <img
              src={profileImage || "/user.jpg"}
              alt="Profile"
              className="profile-photo"
            />
            <div
              className="upload-overlay"
              onClick={() => profileFileInputRef.current.click()}
            >
              <span className="upload-text">Upload</span>
            </div>
            
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={profileFileInputRef}
              onChange={handleProfileImageChange}
            /> 
          </div>
          <h2 className="profile-name">Joe Schmoe</h2>

          <div
  className="bio-container"
  onClick={() => setIsEditingBio(true)}
>
  {isEditingBio ? (
    <textarea
      className="bio-edit"
      value={bio}
      onChange={(e) => setBio(e.target.value)}
      onBlur={() => setIsEditingBio(false)} // Save and exit on blur
      autoFocus
    />
  ) : (
    <p className="bio-text">{bio || "Click to add a bio..."}</p>
  )}
</div>

<div className="pets-section">
  <h2>Your Pets</h2>
  <div className="pets-bubble-container">
    {pets.map((pet, index) => (
      <button
        key={index}
        className="pet-button"
        onClick={() => setActivePet(pet)}
      >
        <img src={pet.image} alt={pet.name} />
        <span>{pet.name}</span>
      </button>
    ))}
  </div>

  {activePet && (
    <div className="pet-popup-overlay" onClick={() => setActivePet(null)}>
      <div className="pet-popup" onClick={(e) => e.stopPropagation()}>
        <h3>{activePet.name}</h3>
        <img src={activePet.image} alt={activePet.name} />
        <p>{activePet.description}</p>
        <button onClick={() => setActivePet(null)}>Close</button>
      </div>
    </div>
  )}
</div>

<div className="pets-following-wrapper">
  <h2>Pets You Follow</h2>
  <div className="pets-following-section">
    <button className="scroll-btn left" onClick={scrollLeft}>❮</button>

    <div className="followed-pets-container" ref={scrollRef}>
      {followedPets.map((pet, i) => (
        <div className="followed-pet" key={i}>
          <img src={pet.image} alt={pet.name} />
          <span>{pet.name}</span>
        </div>
      ))}
    </div>

    <button className="scroll-btn right" onClick={scrollRight}>❯</button>
  </div>
</div>



        </div>

        {/* Cropping Modal */}
        {cropping && (
          <div className="cropper-overlay">
            <div className="cropper-modal">
              <h3>Adjust Your Banner</h3>
              <div className="cropper-container">
                <Cropper
                  image={banner}
                  crop={crop}
                  zoom={zoom}
                  aspect={3}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={handleCropComplete}
                />
              </div>
              <div className="cropper-buttons">
                <button className="cancel-button" onClick={() => setCropping(false)}>
                  Cancel
                </button>
                <button className="apply-button" onClick={handleApplyCrop}>
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ProfilePage;
