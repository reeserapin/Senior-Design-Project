import React, { useState, useRef } from "react";
import Cropper from "react-easy-crop";
import Sidebar from "./Sidebar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AddPetModal from "./AddPetModal";
import PetProfileModal from "./PetProfileModal";
import Posts from "./Posts";
import { MdAddAPhoto } from "react-icons/md";
import { useUser } from '../UserContext';
import { FiPlusCircle } from "react-icons/fi"; 


const generatePostDate = (index) => {
  const daysAgo = index * 2 + Math.floor(Math.random() * 2); // Spread out by ~2 days per post
  const postDate = new Date();
  postDate.setDate(postDate.getDate() - daysAgo);
  return postDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
};



const captions = [
  "Caught mid-zoomies! 🐾",
  "New trick unlocked ✨",
  "This face = instant treat 🎯",
  "Snuggle mode: activated 😴",
  "Who wore it best? 🎉",
  "Say “cheese!” 📸",
  "Just vibin’ in the sun ☀️",
  "Someone’s ready for walkies 🐕",
  "That look when it’s treat time 👀",
  "Besties forever 🐶🐱",
  "Meow or never 😼",
  "Weekend energy 💥",
  "Party animal alert 🎈",
  "Fetch? More like fashion! 💁‍♀️",
  "Snow day adventures ❄️",
  "The grass is paw-some 🌱",
  "Tongue out Tuesday 😋",
  "Too cute to handle 💖",
  "Caught being paws-itively adorable 💅",
  "Tail wags & good vibes 🌈"
];


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
    "https://placedog.net/500/300?id=10",
    "https://placedog.net/500/300?id=11",
    "https://placedog.net/500/300?id=12"
  ],
  [
    "https://placedog.net/500/300?id=13",
    "https://placedog.net/500/300?id=14",
    "https://placedog.net/500/300?id=15"
  ],
  [
    "https://placedog.net/500/300?id=16",
    "https://placedog.net/500/300?id=17",
    "https://placedog.net/500/300?id=9"
  ],
  [
    "https://placedog.net/500/300?id=18",
    "https://placedog.net/500/300?id=19",
    "https://placedog.net/500/300?id=20"
  ],
  [
    "https://placedog.net/500/300?id=21",
    "https://placedog.net/500/300?id=22",
    "https://placedog.net/500/300?id=23"
  ],
  [
    "https://placedog.net/500/300?id=24",
    "https://placedog.net/500/300?id=25",
    "https://placedog.net/500/300?id=26"
  ],
  [
    "https://placedog.net/500/300?id=27",
    "https://placedog.net/500/300?id=28",
    "https://placedog.net/500/300?id=29"
  ],
  [
    "https://placedog.net/500/300?id=30",
    "https://placedog.net/500/300?id=31",
    "https://placedog.net/500/300?id=32"
  ],
  [
    "https://placedog.net/500/300?id=33",
    "https://placedog.net/500/300?id=34",
    "https://placedog.net/500/300?id=35"
  ],
  [
    "https://placedog.net/500/300?id=36",
    "https://placedog.net/500/300?id=37",
    "https://placedog.net/500/300?id=38"
  ],
  [
    "https://placedog.net/500/300?id=39",
    "https://placedog.net/500/300?id=40",
    "https://placedog.net/500/300?id=41"
  ],
  [
    "https://placedog.net/500/300?id=42",
    "https://placedog.net/500/300?id=43",
    "https://placedog.net/500/300?id=44"
  ],
  [
    "https://placedog.net/500/300?id=45",
    "https://placedog.net/500/300?id=46",
    "https://placedog.net/500/300?id=47"
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

const getCroppedImg = (imageSrc, pixelCrop) => {
  const canvas = document.createElement("canvas");
  const img = new Image();

  return new Promise((resolve, reject) => {
    img.onload = () => {
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        img,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );

      resolve(canvas.toDataURL("image/jpeg"));
    };
    img.onerror = reject;
    img.src = imageSrc;
  });
};


function ProfilePage({ pets, setPets }) {
  const [banner, setBanner] = useState(null);
  const [cropping, setCropping] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const fileInputRef = useRef(null);
  const { profileImage, setProfileImage: setGlobalProfileImage } = useUser();
  const profileFileInputRef = useRef(null);
  const [bio, setBio] = useState("Update Bio.");
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [activePet, setActivePet] = useState(null);
  const scrollRef = useRef(null);
  const [activeFollowedPet, setActiveFollowedPet] = useState(null);
  const [username, setUsername] = useState("Joe Schmoe");
  const [isEditingName, setIsEditingName] = useState(false);
  const [editable, setEditable] = useState(false);


  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -150, behavior: "smooth" });
  };
  
  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 150, behavior: "smooth" });
  };

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

  const handleApplyCrop = async () => {
    try {
      const croppedImage = await getCroppedImg(banner, croppedAreaPixels);
      setBanner(croppedImage);
      setCropping(false);
    } catch (e) {
      console.error("Crop failed:", e);
    }
  };
  

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGlobalProfileImage(reader.result); // ✅ sync with sidebar
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
              <span className="upload-text"><MdAddAPhoto /></span>
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
  <div className="your-pets-header">
    <h2>Your Pets</h2>
    <button className="add-pet-inline" onClick={() => setShowAddModal(true)}>
      <FiPlusCircle size={28} />
    </button>
  </div>

  <div className="pets-wrapper">
    <div className="pets-bubble-container">
      {pets.map((pet, index) => (
        <div key={index} style={{ textAlign: "center" }}>
          <button
  className="pet-button"
  onClick={() =>
    setActivePet({
      ...pet,
      onHealthUpdate: (field, value) => {
        const updatedPets = pets.map((p) =>
          p.name === pet.name ? { ...p, [field]: value } : p
        );
        setPets(updatedPets);
        setActivePet((prev) => ({ ...prev, [field]: value }));
      },
    })
  }
   
>

            <img className="pet-image" src={pet.image} alt={pet.name} />
          </button>
          <span className="pet-name">{pet.name}</span>
        </div>
      ))}
    </div>
  </div>

  {/* 🔥 This was missing! */}
  {showAddModal && (
    <AddPetModal
      onClose={() => setShowAddModal(false)}
      onSave={handleAddPet}
    />
  )}
</div>

{activePet && (
    <PetProfileModal
      pet={{
        ...activePet,
        onHealthUpdate: (field, value) => {
          const updatedPets = pets.map((p) =>
            p.name === activePet.name ? { ...p, [field]: value } : p
          );
          setPets(updatedPets);
          setActivePet((prev) => ({ ...prev, [field]: value }));
        },
        onPersonalityUpdate: (field, value) => {
          const updatedPets = pets.map((p) =>
            p.name === activePet.name
              ? {
                  ...p,
                  personality: {
                    ...p.personality,
                    [field]: value,
                  },
                }
              : p
          );
          setPets(updatedPets);
          setActivePet((prev) => ({
            ...prev,
            personality: {
              ...prev.personality,
              [field]: value,
            },
          }));
        },
      }}
      onClose={() => {
        setActivePet(null);
        setEditable(false);
      }}
      editable={editable}
      onToggleEdit={() => setEditable((prev) => !prev)}
      showEditButton={true}
      posts={postImages.map((images, index) => ({
        images,
        caption: captions[index % captions.length],
        date: generatePostDate(index),
      }))}
    />
  )}
  





<div className="pets-following-wrapper">
  <h2>Pets You Follow</h2>
  <div className="pets-following-section">
    <div className="followed-pets-container" ref={scrollRef}>
      {[
      { name: "Millie", image: "https://unsplash.it/201/200" },
      {
        name: "Milo",
        image: "https://cdn2.thecatapi.com/images/bpc.jpg",
        breed: "Manx",
        age: "3 years",
        gender: "Boy",
        weight: "9.3 lbs",
        adoptionStory: "Milo was found as a tiny kitten curled up under a porch during a rainstorm, shivering and alone. A kind neighbor rescued him and brought him to the local shelter, where he quickly charmed everyone with his playful energy and big green eyes. After just a few weeks, he was adopted by a young couple who instantly fell in love with his goofy personality and endless curiosity. Now, Milo spends his days exploring sunbeams, cuddling on the couch, and reminding his family just how lucky they are to have found him.",

        vaccinated: true,
        spayedNeutered: true,
        medicalConditions: "None",
        personality: { temperament: 3, energyLevel: 5 },
        lifestyle: {
          goodWithKids: true,
          goodWithPets: true,
          indoorOutdoor: "Indoor",
          pottyTrained: true,
          crateTrained: false
        },
        favoriteActivities: "Chasing lasers, sleeping on laptops, knocking over water.",
        careRoutine: "Brushed twice a week. Loves tuna treats. Needs daily cuddles.",
        bio: "Meet Milo, a fun-loving cat with a heart full of mischief and a tail that never stops swaying. Whether she's chasing sunbeams across the living room floor or attempting daring leaps onto countertops she definitely shouldn't be on, her playful spirit brings laughter to everyone around her. 🐾",
        taggedImages: ["url1", "url2", "url3"],
          // ✅ Add this galleryImages array here:
          galleryImages: [
            "https://cdn2.thecatapi.com/images/bpc.jpg",
            "https://cdn2.thecatapi.com/images/c3h.jpg",
            "https://cdn2.thecatapi.com/images/4uv.jpg",
            "https://cdn2.thecatapi.com/images/9j5.jpg",
            "https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg",
            "https://cdn2.thecatapi.com/images/2oo.jpg"
          ]
          
      },
      
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
  <Posts postImages={postImages} captions={captions} />
</div>


</div>

        </div>
        {activeFollowedPet && (
  <PetProfileModal
    pet={activeFollowedPet}
    onClose={() => setActiveFollowedPet(null)}
    editable={false}
    posts={postImages.map((images, index) => ({
      images,
      caption: captions[index % captions.length],
      date: generatePostDate(index),
    }))}
  />
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

/* Embedded CSS */
const style = document.createElement('style');
style.innerHTML =  `

/* General Profile Page Layout */
.profile-container {
  display: flex;
  height: 100vh;
  background-color: #f5faff;
}

.profile-main {
  width: calc(100% - 80px);
  margin-left: 80px;
  padding: 20px;
  margin-top: 60px;
}

/* Banner Section */
.profile-banner {
  width: 100%;
  height: 200px; /* or whatever height you want */
  position: relative;
  overflow: hidden;
  background-color: #cceeff; /* fallback background if needed */
  border-radius: 20px;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
}


/* Upload Button */
.upload-button {
  position: absolute;
  bottom: 15px;
  right: 15px;
  padding: 8px 12px;
  font-size: 14px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.upload-button:hover {
  background-color: #45a049;
}

.profile-banner-container {
  position: relative;
  margin: 50px auto 0;
  width: calc(100% - 100px);
  max-width: 2000px;
}

/* Rounded blue banner */
.profile-banner {
  height: 200px;
  background-color: #d6f4ff;
  border-radius: 40px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 20px;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.upload-button {
  z-index: 1;
  background-color: #4CAF50;
  color: white;
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  position: absolute;
  bottom: 20px;
  right: 20px;
}

/* 👇 Circle profile image */
.profile-photo-container {
  position: absolute;
  top: 160px; /* adjust as needed */
  left: 60px;
  z-index: 5;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
  cursor: pointer;
}

.profile-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}


.profile-name {
  margin-top: -120px;
  margin-left: 65px;
  font-size: 25px;
  font-weight: 600;
  color: #333;
}


.upload-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.profile-photo-container:hover .upload-overlay {
  opacity: 1;
}

.upload-text {
  font-size: 25px;
  font-weight: bold;
}

/* Cropping Modal */
.cropper-modal {
  background-color: #fff;
  border-radius: 15px;
  padding: 20px;
  max-width: 700px;
  width: 90%;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  position: relative;
  text-align: center;
  max-height: 90vh;
  overflow-y: auto;
}

.cropper-modal h3 {
  margin-bottom: 15px;
  font-size: 1.5rem;
  font-weight: bold;
}

/* Cropping Background Overlay */
.cropper-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* dark blur effect */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.cropper-container {
  position: relative;
  width: 100%;
  height: 350px;
  margin-bottom: 20px;
  border-radius: 10px;
  overflow: hidden;
}
/* Cropping Buttons */
.cropper-buttons {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.cancel-button,
.apply-button {
  flex: 1;
  padding: 10px 0;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s ease;
}


.cancel-button {
  background-color: #e74c3c;
  color: white;
}

.apply-button {
  background-color: #2ecc71;
  color: white;
}

.cancel-button:hover {
  background-color: #c0392b;
}

.apply-button:hover {
  background-color: #27ae60;
}

.profile-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 170px; /* optional: adjust spacing */
  margin-top: 60px;
  margin-bottom: 30px;
  margin-left: auto; /* <-- center horizontally */
  margin-right: auto; /* <-- center horizontally */
}

.stat-circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #948be1; /* or any accent color */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  color: white;
}

.stat-number {
  font-size: 20px;
  font-weight: bold;
}

.stat-label {
  font-size: 14px;
  margin-top: 4px;
}

.bio-container {
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
  max-width: 800px;
  text-align: center;
  cursor: pointer;
}

.bio-text {
  font-size: 16px;
  color: #2c2828;
  transition: background 0.2s;
}

.bio-container:hover .bio-text {
  background-color: #f0f0f0;
}

.bio-edit {
  width: 100%;
  min-height: 80px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  resize: vertical;
}

.pets-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}

.add-pet-float {
  position: absolute;
  top: -20%;
  transform: translateY(-50%);
  right: 580px;
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 50%;
  border: 3px solid #85cbe9;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  cursor: pointer;
  transition: transform 0.2s ease;
}
.add-pet-float:hover {
  transform: translateY(-50%) scale(1.1);
}

.add-pet-float img {
  width: 24px;
  height: 24px;
}


.pets-section {
  text-align: center;
  margin-top: 60px;
}

.pets-list {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 20px;
}

.pet-button {
  background-color: #c0dbe7;
  border: none;
  border-radius: 50%;
  width: 140px;
  height: 140px;
  overflow: hidden;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  transition: transform 0.2s;
}

.pet-button img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0; /* remove the gap */
}


.pet-button:hover {
  transform: scale(1.05);
}

/* Popup Styling */
.pet-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.pet-popup {
  background: white;
  border-radius: 20px;
  padding: 20px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 6px 20px rgba(0,0,0,0.3);
  text-align: center;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pet-popup-image {
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 15px;
}

.pet-popup-desc {
  font-size: 14px;
  margin-top: 10px;
  color: #333;
}

.close-button {
  margin-top: 15px;
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  background-color: #ccc;
  cursor: pointer;
}

.close-button:hover {
  background-color: #aaa;
}

.pets-bubble-container {
  background-color: #85cbe9;
  border-radius: 100px;
  padding: 20px 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  width: fit-content;
  margin: 0 auto;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.pets-following-wrapper {
  margin-top: 40px;
  text-align: center;
}

.pets-following-wrapper h2 {
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 600;
}

.pets-following-section {
  background-color: #85cbe9;
  border-radius: 100px;
  padding: 20px 40px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.followed-pets-container {
  display: flex;
  gap: 30px;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.followed-pets-container::-webkit-scrollbar {
  display: none;
}

.followed-pet {
  all: unset; /* 🔥 resets all default button styles */
  flex: 0 0 auto;
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}


.followed-pet img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.followed-pet span {
  display: block;
  margin-top: 8px;
  font-size: 15px;
  font-weight: 500;
}

.your-posts-section {
  margin-top: 60px;
  text-align: center;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.post-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
}

.post-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid #eee;
}


.post-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px; /* was 16px 20px or more */
  gap: 8px; /* tighten spacing between icons and text */
}


.post-text-icon-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
}


.post-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.post-icons {
  display: flex;
  gap: 10px; /* was 16px — shrink spacing between icons */
  margin-bottom: 0px; /* remove extra space below */
}

.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 22px;
  color: black;
  transition: transform 0.2s ease;
}

.icon-button:hover {
  transform: scale(1.1);
}

.post-icon {
  font-size: 22px;
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.post-icon:hover {
  transform: scale(1.1);
}

.post-text {
  display: flex;
  flex-direction: column;
  margin-top: -4px; /* optional: brings text closer to icons */
}

.post-text p {
  margin: 0;
  line-height: 1.2;
}

.timestamp {
  font-size: 12px;
  color: gray;
  margin-top: 2px;
}

.post-profile {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  margin-left: 10px;
}


.profile-name-edit {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 5px;
  margin-top: -40px;
}

.profile-name {
  font-size: 25px;
  font-weight: 600;
  color: #333;
}

.edit-name-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  margin-left: -170px;   /* horizontal spacing */
  margin-top: -135px;    /* vertical spacing */
}


.edit-name-button img {
  width: 20px;
  height: 20px;
}

.name-input {
  font-size: 22px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 10px;
  border: 1px solid #ccc;
  margin-left: 10px;   /* horizontal spacing */
  margin-top: -135px;
}

.edit-banner-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 48px;
  height: 48px;
  background-color: #f97068; /* red/pinkish tone */
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-banner-button:hover {
  background-color: #e14e4e;
}

.edit-banner-button img {
  width: 22px;
  height: 22px;
}

.image-preview {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: 0 auto 20px; /* 👈 Centers horizontally and adds spacing below */
}


.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.your-pets-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 10px;
}

.add-pet-inline {
  background-color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #89cff0;
  cursor: pointer;
  transition: transform 0.2s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.add-pet-inline:hover {
  transform: scale(1.1);
}


`;
document.head.appendChild(style); 
