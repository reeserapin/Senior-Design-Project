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
  const [activeFollowedPet, setActiveFollowedPet] = useState(null);


  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -150, behavior: "smooth" });
  };
  
  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 150, behavior: "smooth" });
  };
  
  // const followedPets = [
  //   { name: "Millie", image: "/millie.jpg" },
  //   { name: "Milo", image: "/milo.jpg" },
  //   { name: "Burrito", image: "/burrito.jpg" },
  //   { name: "Autumn", image: "/autumn.jpg" },
  //   { name: "Luna", image: "/luna.jpg" },
  //   { name: "Donut", image: "/donut.jpg" },
  //   { name: "Buddy", image: "/buddy.jpg" },
  //   { name: "Nala", image: "/nala.jpg" }
  // ];
  

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
    <div className="followed-pets-container" ref={scrollRef}>
      {[
      { name: "Millie", image: "https://unsplash.it/201/200" },
      { name: "Milo", image: "https://unsplash.it/200/200" },
      { name: "Burrito", image: "https://placedog.net/200/200" },
      { name: "Autumn", image: "https://placedog.net/201/200" },
      { name: "Luna", image: "https://placedog.net/202/200" },
      { name: "Donut", image: "https://placedog.net/203/200" },
      { name: "Buddy", image: "https://placedog.net/204/200" },
      { name: "Nala", image: "https://unsplash.it/202/200" },
      { name: "Pickles", image: "https://unsplash.it/203/200" },
      { name: "Shadow", image: "https://placedog.net/205/200" },
      { name: "Pumpkin", image: "https://unsplash.it/204/200" },
      { name: "Ziggy", image: "https://placedog.net/206/200" },
      { name: "Taco", image: "https://placedog.net/207/200" },
      { name: "Ginger", image: "https://unsplash.it/205/200" },
      { name: "Snowball", image: "https://unsplash.it/206/200" },
      { name: "Rocco", image: "https://placedog.net/208/200" },
      { name: "Mochi", image: "https://unsplash.it/207/200" },
      { name: "Juno", image: "https://placedog.net/209/200" },
      { name: "Kiwi", image: "https://unsplash.it/208/200" },
      { name: "Pebbles", image: "https://placedog.net/210/200" },
      { name: "Zara", image: "https://unsplash.it/209/200" },
      { name: "Churro", image: "https://placedog.net/211/200" },
      { name: "Smokey", image: "https://unsplash.it/210/200" },
      { name: "Olive", image: "https://placedog.net/212/200" },
      { name: "Banjo", image: "https://placedog.net/213/200" },
      { name: "Pudding", image: "https://unsplash.it/211/200" },
      { name: "Clover", image: "https://unsplash.it/212/200" },
      { name: "Teddy", image: "https://placedog.net/214/200" },
      { name: "Buttons", image: "https://unsplash.it/213/200" },
      { name: "Goose", image: "https://placedog.net/215/200" },
      { name: "Miso", image: "https://unsplash.it/214/200" },
      { name: "Scout", image: "https://placedog.net/216/200" },
      { name: "Nugget", image: "https://unsplash.it/215/200" },
      ].map((pet, index) => (
        <button
  key={index}
  className="followed-pet"
  onClick={() => setActiveFollowedPet(pet)}
>
  <img src={pet.image} alt={pet.name} />
  <span>{pet.name}</span>
</button>

      ))}
    </div>
  </div>
  <div className="your-posts-section">
  <h2>Your Posts</h2>
  <div className="posts-grid">
    {Array.from({ length: 9 }).map((_, index) => (
      <div key={index} className="post-card">
        <img
          className="post-image"
          src="https://images.unsplash.com/photo-1601758123927-1961e4cd67c2"
          alt="Post"
        />
        <div className="post-info">
          <div className="post-icons">
            <span>🐾</span>
            <span>🖥️</span>
            <span>✈️</span>
          </div>
          <div className="post-text">
            <p><strong>Sparky doing tricks!</strong></p>
            <p className="timestamp">20 minutes ago</p>
          </div>
          <img
            className="post-profile"
            src="/user.jpg"
            alt="User"
          />
        </div>
      </div>
    ))}
  </div>
</div>

</div>

        </div>
        {activeFollowedPet && (
  <div className="pet-popup-overlay" onClick={() => setActiveFollowedPet(null)}>
    <div className="pet-popup" onClick={(e) => e.stopPropagation()}>
      <h3>{activeFollowedPet.name}</h3>
      <img src={activeFollowedPet.image} alt={activeFollowedPet.name} />
      <p>This is a pet you're following!</p>
      <button onClick={() => setActiveFollowedPet(null)}>Close</button>
    </div>
  </div>
)}

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
