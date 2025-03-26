import React, { useState, useRef } from "react";
import Cropper from "react-easy-crop";
import Sidebar from "../Sidebar";
import "../styles/Profilepage.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaPaw } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AddPetModal from "./AddPetModal";


const postImages = [
  [
    "https://www.warrenphotographic.co.uk/photography/bigs/44826-Blue-point-Birman-cross-cat-and-Goldendoodle-puppy-white-background.jpg",
    "https://images.squarespace-cdn.com/content/v1/5b5499a13c3a53487c250d73/1548212711672-14PLK00UM15YHKBXHOWK/golden2.jpg",
    "https://preview.redd.it/anyones-else-doodle-think-hes-a-soccer-play-he-uses-his-v0-8geu6iyc3n9b1.jpg?width=640&crop=smart&auto=webp&s=da46ffc4ec1a641af6f877bbf85f1934faf58fb5"
  ],
  [
    "https://images.unsplash.com/photo-1566927467984-6332be7377d0?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0JTIwYmlydGhkYXl8ZW58MHx8MHx8fDA%3D",
    "https://image.petmd.com/files/inline-images/white-cat-breeds-munchkin.jpg?VersionId=.uzqQ5bbncHjG38rNmx18EzEEGPIe6H0",
    "https://preview.redd.it/whats-your-cats-favourite-toy-mine-gets-so-easily-bored-of-v0-f918p0n68as81.jpg?width=1080&crop=smart&auto=webp&s=3c8838a69d24f1859e9b554e3cde8a3e657cc28a"
  ],
  [
    "https://i0.pickpik.com/photos/18/674/411/game-animals-dog-cat-white-cat-preview.jpg",
    "https://ilovemychi.com/wp-content/uploads/2015/11/Jim-And-Sandy.jpg",
    "https://media.graphassets.com/resize=height:360,width:938/output=format:webp/9JrMeDVZTbO7AKMsI5NL?width=938"
  ],
  [
    "https://premierpups.com/azure/premierphotos/photogallery/85db4ef0-ecd6-42d9-8335-08e06824e9d3.jpeg?preset=detail",
    "https://placedog.net/500/300?id=8",
    "https://placedog.net/500/300?id=9"
  ],
  [
    "https://placedog.net/500/300?id=7",
    "https://placedog.net/500/300?id=8",
    "https://placedog.net/500/300?id=9"
  ],
  [
    "https://placedog.net/500/300?id=7",
    "https://placedog.net/500/300?id=8",
    "https://placedog.net/500/300?id=9"
  ],
  [
    "https://placedog.net/500/300?id=7",
    "https://placedog.net/500/300?id=8",
    "https://placedog.net/500/300?id=9"
  ],
  [
    "https://placedog.net/500/300?id=7",
    "https://placedog.net/500/300?id=8",
    "https://placedog.net/500/300?id=9"
  ],
  [
    "https://placedog.net/500/300?id=7",
    "https://placedog.net/500/300?id=8",
    "https://placedog.net/500/300?id=9"
  ],
  [
    "https://placedog.net/500/300?id=7",
    "https://placedog.net/500/300?id=8",
    "https://placedog.net/500/300?id=9"
  ],
  [
    "https://placedog.net/500/300?id=7",
    "https://placedog.net/500/300?id=8",
    "https://placedog.net/500/300?id=9"
  ],
  [
    "https://placedog.net/500/300?id=7",
    "https://placedog.net/500/300?id=8",
    "https://placedog.net/500/300?id=9"
  ],
  [
    "https://placedog.net/500/300?id=7",
    "https://placedog.net/500/300?id=8",
    "https://placedog.net/500/300?id=9"
  ],
  [
    "https://placedog.net/500/300?id=7",
    "https://placedog.net/500/300?id=8",
    "https://placedog.net/500/300?id=9"
  ],
  [
    "https://placedog.net/500/300?id=7",
    "https://placedog.net/500/300?id=8",
    "https://placedog.net/500/300?id=9"
  ],
  [
    "https://placedog.net/500/300?id=7",
    "https://placedog.net/500/300?id=8",
    "https://placedog.net/500/300?id=9"
  ],
  [
    "https://placedog.net/500/300?id=7",
    "https://placedog.net/500/300?id=8",
    "https://placedog.net/500/300?id=9"
  ],
  [
    "https://placedog.net/500/300?id=7",
    "https://placedog.net/500/300?id=8",
    "https://placedog.net/500/300?id=9"
  ],
  // Add more posts as needed
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false
};

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
  const [username, setUsername] = useState("Joe Schmoe");
  const [isEditingName, setIsEditingName] = useState(false);
  

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -150, behavior: "smooth" });
  };
  
  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 150, behavior: "smooth" });
  };


  const [pets, setPets] = useState([
    {
      name: "Sparky",
      image: "https://arrowtpets.com/wp-content/uploads/2023/05/Understanding-Goldendoodle-Behavior_-Common-Traits-and-Personality.png",
      description: "Sparky loves running in the park and chasing tennis balls."
    },
    {
      name: "Spot",
      image: "https://www.humaneworld.org/sites/default/files/styles/responsive_3_4_500w/public/2020-07/dog-509745.jpg.webp?itok=tVo9pIsi",
      description: "Spot is a goofy pup who loves cuddles and treats."
    },
    {
      name: "Snowy",
      image: "https://puzzlemania-154aa.kxcdn.com/products/2024/puzzle-ravensburger-1500-pieces-white-kitten.webp",
      description: "Snowy is the quietest and fluffiest kitten you'll meet!"
    }
  ]);



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

  const [showAddModal, setShowAddModal] = useState(false);

const handleAddPet = (newPet) => {
  setPets([...pets, { ...newPet, description: "Newly added pet!" }]);
  setShowAddModal(false);
};


  return (
    <div className="profile-container">
      <Sidebar />
      <main className="profile-main">
        <div className="profile-banner-container">
          <div className="profile-banner">
            
          {banner && (
  <img src={banner} alt="Banner" className="banner-image" />
)}

<button className="edit-banner-button" onClick={() => fileInputRef.current.click()}>
  <img src="/pencil-edit-button.svg" alt="Edit" />
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
              src={profileImage || "/linkedGIRL.jpg"}
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
          <div className="profile-name-edit">
  {isEditingName ? (
    <input
      className="name-input"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      onBlur={() => setIsEditingName(false)}
      autoFocus
    />
  ) : (
    <>
      <h2 className="profile-name">{username}</h2>
      <button className="edit-name-button" onClick={() => setIsEditingName(true)}>
        <img src="/pencil-edit-button.svg" alt="Edit name" />
      </button>
    </>
  )}
</div>

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
  <div className="pets-wrapper">
    <div className="pets-bubble-container">
      {pets.map((pet, index) => (
        <div key={index} style={{ textAlign: "center" }}>
          <button className="pet-button" onClick={() => setActivePet(pet)}>
            <img className="pet-image" src={pet.image} alt={pet.name} />
          </button>
          <span className="pet-name">{pet.name}</span>
        </div>
      ))}
    </div>

    <button className="add-pet-float" onClick={() => setShowAddModal(true)}>
      <img src="/pluscircle.png" alt="Add" />
    </button>
  </div>

  {/* 🔥 This was missing! */}
  {showAddModal && (
    <AddPetModal
      onClose={() => setShowAddModal(false)}
      onSave={handleAddPet}
    />
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
  {postImages.map((imageSet, index) => (
    <div key={index} className="post-card">
      <Slider {...sliderSettings}>
        {imageSet.map((imgUrl, i) => (
          <img key={i} className="post-image" src={imgUrl} alt={`Slide ${i}`} />
        ))}
      </Slider>
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
