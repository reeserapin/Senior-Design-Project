import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import TopBar from './pages/Topbar';
import Sidebar from './pages/Sidebar';
import HomePage from './pages/Homepage';
import PedigreePage from './pages/Pedigreepage';
import PetShopPage from './pages/PetShoppage';
import ProfilePage from './pages/Profilepage';
import SettingsPage from './pages/Settingspage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PetProfileModal from './pages/PetProfileModal';
import ChatPage from './pages/ChatBox';
import './index.css';
import { UserProvider } from './UserContext';

const captions = [
  "Caught mid-zoomies! 🐾", "New trick unlocked ✨", "This face = instant treat 🎯",
  "Snuggle mode: activated 😴", "Who wore it best? 🎉", "Say cheese! 📸",
  "Just vibin' in the sun ☀️", "Someone's ready for walkies 🐕", "That look when it's treat time 👀",
  "Besties forever 🐶🐱", "Meow or never 😼", "Weekend energy 💥",
  "Party animal alert 🎈", "Fetch? More like fashion! 💁‍♀️", "Snow day adventures ❄️",
  "The grass is paw-some 🌱", "Tongue out Tuesday 😋", "Too cute to handle 💖",
  "Caught being paws-itively adorable 💅", "Tail wags & good vibes 🌈"
];

const postImages = [
  ["https://placedog.net/500/300?id=1", "https://placedog.net/500/300?id=2", "https://placedog.net/500/300?id=3"],
  ["https://placedog.net/500/300?id=4", "https://placedog.net/500/300?id=5", "https://placedog.net/500/300?id=6"],
  ["https://placedog.net/500/300?id=7", "https://placedog.net/500/300?id=8", "https://placedog.net/500/300?id=9"],
  ["https://placedog.net/500/300?id=10", "https://placedog.net/500/300?id=11", "https://placedog.net/500/300?id=12"],
];

const generatePostDate = (index) => {
  const daysAgo = index * 2 + Math.floor(Math.random() * 2);
  const postDate = new Date();
  postDate.setDate(postDate.getDate() - daysAgo);
  return postDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
};

function App() {
  const [pets, setPets] = useState([
    {
      name: "Buddy",
      image: "/pedigree/puppy1.jpg",
      breed: "Labrador Retriever",
      age: "5 Months Old",
      gender: "Male",
      weight: "12 kg",
      vaccinated: true,
      spayedNeutered: true,
      medicalConditions: "None! Just being too cute!",
      personality: {
        temperament: 4,
        energyLevel: 5,
      },
      lifestyle: {
        goodWithKids: true,
        goodWithPets: true,
        indoorOutdoor: false,
        pottyTrained: true,
      },
      favoriteActivities: "Fetching, Running",
      bio: "Buddy is an energetic and friendly Labrador Retriever who loves to run and fetch. At just 5 months old, he's already an active and playful companion, always eager to spend time with his family. Whether he's chasing after a ball or cuddling up for a nap, Buddy brings joy to everyone around him. Adopted from a shelter, Buddy quickly became a beloved member of the family, known for his affectionate nature and love for treats. With his playful spirit and loving heart, Buddy is a true companion.",
      galleryImages: [
        "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/1-young-labrador-retriever-jean-louis-klein--marie-luce-hubert.jpg",
        "https://cdn.shopify.com/s/files/1/0525/2500/7030/files/Happy_Lab_187e918c-86e2-4410-aa92-3bc573842651_1024x1024.jpg?v=1712229764",
        "https://media.ceva.com/transform/9956d7a0-12e4-4ed4-916e-e051f3e98225/shutterstock_119485363_cropped-min",
        "https://res.cloudinary.com/lancaster-puppies-laravel/image/upload/v1742706526/default/wslgb6xsdgdr3p5qnocp.jpg",
        "https://img.freepik.com/premium-photo/young-purebred-puppy-labrador-retriever-sleeping-bed_508659-1573.jpg",
        "https://barakennels.com/uploads/3/4/8/9/34899735/20240221-175845.jpg",
        "https://i.pinimg.com/564x/ea/40/be/ea40becadbae9cd9820e70eddab37181.jpg",
        "https://images.cdn-files-a.com/uploads/3052680/2000_5e3f1139ac4d4.jpg",
        "https://www.snowypineswhitelabs.com/wp-content/uploads/2019/10/Crystal_5-1-1024x683.jpg",

      ],
      adoptionStory: "Buddy’s adoption story is one filled with love and hope. Found in a local shelter at just 3 months old, Buddy was a playful little puppy with a big heart, but he needed a family to call his own. When his new family walked into the shelter, it was love at first sight. Despite the uncertainty of his past, Buddy immediately bonded with them, wagging his tail and giving them all the puppy kisses they could handle. It didn’t take long for them to know that Buddy was the perfect addition to their family. He now enjoys a life full of play, adventure, and lots of love. Buddy is more than just a pet; he’s a cherished member of the family who brings joy and happiness to everyone he meets. From shelter to family, Buddy’s journey is a reminder of the transformative power of adoption.",
      birthday: "09/01/2024",
      adoptionStatus: "A Part of My Family",
      dietaryPreferences: "No specific preferences",
      hobbies: "Playing fetch",
      likesDislikes: "Likes treats, dislikes water",
      vetInfo: "Regular checkups every year",
      lostStatus: false,
    },
    // Repeat for other pets
  
    {
      name: "Spot",
      image: "https://www.innovetpet.com/cdn/shop/articles/29511155786_2fa0890d-ea5e-43f2-aee6-a6fa61b7e146.jpg?v=1739827007"
    },
    {
      name: "Snowy",
      image: "https://www.thesprucepets.com/thmb/hJ40hdpK4KZ5AehlMmVEdJr8zPI%3D/1999x1459/filters%3Afill%28auto%2C1%29/twenty20_e47b3798-dd9b-40b1-91ef-1d820337966e-5aa3f798642dca00363b0df1.jpg"
    }
  ]);

  const [activePet, setActivePet] = useState(null);
  const [editable, setEditable] = useState(false);
  const [followedPets, setFollowedPets] = useState([]);

  const posts = postImages.map((images, index) => ({
    images,
    caption: captions[index % captions.length],
    date: generatePostDate(index),
    taggedPets: [
      {
        name: "Snowy",
        image: "https://www.thesprucepets.com/thmb/hJ40hdpK4KZ5AehlMmVEdJr8zPI%3D/1999x1459/filters%3Afill(auto,1)/twenty20_e47b3798-dd9b-40b1-91ef-1d820337966e-5aa3f798642dca00363b0df1.jpg",
      },
    ],
    taggedFollowedPets: [
      {
        name: "Buddy",
        image: "https://placedog.net/300/300?id=98",
      },
      {
        name: "Luna",
        image: "https://placedog.net/300/300?id=99",
      },
    ]
  }));
  

  return (
    <Router>
      <div className="app">
        <TopBar
          pets={pets}
          setPets={setPets}
          setActivePet={(pet) => {
            setActivePet(pet);
            setEditable(false);
          }}
        />
        <Sidebar pets={pets} followedPets={followedPets} />

        <Routes>
          <Route path="/" element={
            <div className="auth-content">
              <LoginPage />
            </div>
          } />
          <Route path="/signup" element={
            <div className="auth-content">
              <SignupPage />
            </div>
          } />
          <Route
            path="*"
            element={
              <div className="main-content">
                <div className="content">
                  <Routes>
                    <Route path="/home" element={<HomePage />} />
                    <Route
                      path="/profile"
                      element={
                        <ProfilePage
                          pets={pets}
                          setPets={setPets}
                          setActivePet={setActivePet}
                        />
                      }
                    />
                    <Route path="/pedigree" element={<PedigreePage />} />
                    <Route path="/petshop" element={<PetShopPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/chat" element={<ChatPage />} />
                  </Routes>
                </div>
              </div>
            }
          />
        </Routes>

        {activePet && (
          <PetProfileModal
            pet={{
              ...activePet,
              onHealthUpdate: (field, value) => {
                const updated = pets.map((p) =>
                  p.name === activePet.name ? { ...p, [field]: value } : p
                );
                setPets(updated);
                setActivePet((prev) => ({ ...prev, [field]: value }));
              },
              onPersonalityUpdate: (field, value) => {
                const updated = pets.map((p) =>
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
                setPets(updated);
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
            showEditButton={true}
            onToggleEdit={() => setEditable((prev) => !prev)}
            posts={posts}
          />
        )}
      </div>

      {/* Add CSS for auth pages */}
      <style>
        {`
          .auth-content {
            margin-left: 70px;
            margin-top: 60px;
            padding: 0;
            height: calc(100vh - 60px);
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #E8FAFF;
            overflow: hidden;
          }
          
          /* Override any scrolling in the login/signup forms */
          .auth-content .lg-login-page {
            padding: 0;
            overflow: hidden;
            min-height: calc(100vh - 60px);
            height: calc(100vh - 60px);
            width: 100%;
          }
          
          /* Make containers bigger */
          .auth-content .lg-login-container {
            width: 900px;
            height: 600px;
            max-height: 80vh;
            margin: 0 auto;
            position: relative;
            top: 0; /* Remove negative top position */
          }
          
          /* Style for the form container */
          .auth-content .lg-form-container {
            margin: auto 0;
            display: flex;
            flex-direction: column;
          }
          
          /* Ensure the form has enough space for all elements */
          .auth-content .lg-login-form {
            padding: 20px 50px;
            min-width: 450px;
            justify-content: center;
            display: flex;
          }
          
          /* Make text inputs larger and reduce space between them */
          .auth-content .lg-form-group {
            margin-bottom: 12px;
          }
          
          .auth-content .lg-form-group input {
            padding: 10px;
            font-size: 1.1rem;
          }
          
          /* Move button up */
          .auth-content .lg-signup-button {
            padding: 10px;
            font-size: 1.1rem;
            margin-top: 15px;
          }
          
          /* Move text below button up */
          .auth-content .lg-login-form p {
            margin-top: 10px !important;
          }
          
          /* Fix illustration size */
          .auth-content .lg-dog-illustration {
            width: 200px;
            height: 200px;
          }
          
          /* Adjust form spacing and move title up */
          .auth-content h2 {
            font-size: 2rem !important;
            margin-bottom: 20px !important;
            margin-top: 0 !important;
          }
          
          /* Reduce space between label and input */
          .auth-content .lg-form-group label {
            margin-bottom: 4px;
          }
          
          /* Reduce space for password checkbox */
          .auth-content .lg-show-password {
            margin-top: 4px;
          }
        `}
      </style>
      </Router>
  );
}

export default App;