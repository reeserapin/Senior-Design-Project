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


function AppContent() {
  const location = useLocation();
  const pathname = location.pathname;

  const isChatPage = pathname === '/chat';
  const isPetShopPage = pathname === '/petshop';
  const isSettingsPage = pathname === '/settings';
  const isPedigreePage = pathname === '/pedigree';
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const pageThemeClass = isChatPage
    ? 'theme-chat'
    : isPetShopPage
    ? 'theme-petshop'
    : isPedigreePage
    ? 'theme-pedigree'
    : isSettingsPage
    ? 'theme-settings'
    : 'theme-default';

const [pets, setPets] = useState([
    {
      name: "Buddy",
      image: "/pedigree/puppy1.jpg"
    },
    {
      name: "Spot",
      image: "https://dogtime.com/wp-content/uploads/sites/12/2023/11/GettyImages-157603001-e1701106766955.jpg?w=1024"
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

    <div className={`app ${pageThemeClass}`}>
      <TopBar
          pets={pets}
          setPets={setPets}
          setActivePet={(pet) => {
            setActivePet(pet);
            setEditable(false);
          }}
        />
        <Sidebar pets={pets} followedPets={followedPets} setIsLoggedIn={setIsLoggedIn} />

      <Routes>
      <Route path="/" element={
        <div className="auth-content">
          <LoginPage setIsLoggedIn={setIsLoggedIn} />
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

      {/* Add CSS for auth pages */}
      <style>
        {`
          .auth-content {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            width: 100vw;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #E8FAFF;
            z-index: 10;
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
    </div>
  );
}

// ✅ This must be OUTSIDE of AppContent
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;