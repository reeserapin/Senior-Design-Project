import React, { useState, useRef } from "react";
import Cropper from "react-easy-crop";
import Sidebar from "../Sidebar";
import "../styles/Profilepage.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AddPetModal from "./AddPetModal";
import { FaPaw, FaComment } from "react-icons/fa";
import { TbSend } from "react-icons/tb";
import PetProfileModal from "./PetProfileModal";
import Posts from "./Posts";



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

{activePet && (
  <PetProfileModal
    pet={activePet}
    onClose={() => setActivePet(null)}
    editable={true}
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
        personality: { temperament: "Playful", energyLevel: "High" },
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
