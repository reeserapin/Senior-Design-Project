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
      name: "Sparky",
      image: "https://www.carecredit.com/sites/cc/image/chihuahua-slider_2.jpg"
    },
    {
      name: "Spot",
      image: "https://hips.hearstapps.com/ghk.h-cdn.co/assets/17/30/bernese-mountain-dog.jpg?crop=1.00xw:0.667xh;0,0.213xh&resize=980:*"
    },
    {
      name: "Snowy",
      image: "https://www.thesprucepets.com/thmb/hJ40hdpK4KZ5AehlMmVEdJr8zPI%3D/1999x1459/filters%3Afill%28auto%2C1%29/twenty20_e47b3798-dd9b-40b1-91ef-1d820337966e-5aa3f798642dca00363b0df1.jpg"
    }
  ]);

  const [activePet, setActivePet] = useState(null);
  const [editable, setEditable] = useState(false);

  const posts = postImages.map((images, index) => ({
    images,
    caption: captions[index % captions.length],
    date: generatePostDate(index),
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
        <Sidebar />

        <Routes>
          <Route path="/login" element={
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
                    <Route path="/" element={<HomePage />} />
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
            padding: 20px;
            min-height: calc(100vh - 60px);
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #E8FAFF;
          }
        `}
      </style>
    </Router>
  );
}

export default App;
