import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './pages/Topbar';
import Sidebar from './pages/Sidebar';
import HomePage from './pages/Homepage';
import PedigreePage from './pages/Pedigreepage';
import PetShopPage from './pages/PetShoppage';
import ProfilePage from './pages/Profilepage';
import SettingsPage from './pages/Settingspage';
import PetProfileModal from './pages/PetProfileModal';

function App() {
  const [pets, setPets] = useState([
    { name: "Sparky", image: "https://www.carecredit.com/sites/cc/image/chihuahua-slider_2.jpg" },
    { name: "Spot", image: "https://hips.hearstapps.com/ghk.h-cdn.co/assets/17/30/bernese-mountain-dog.jpg?crop=1.00xw:0.667xh;0,0.213xh&resize=980:*" },
    { name: "Snowy", image: "https://www.thesprucepets.com/thmb/hJ40hdpK4KZ5AehlMmVEdJr8zPI%3D/1999x1459/filters%3Afill%28auto%2C1%29/twenty20_e47b3798-dd9b-40b1-91ef-1d820337966e-5aa3f798642dca00363b0df1.jpg" }
  ]);
  const [activePet, setActivePet] = useState(null);

  return (
    <Router>
      <div className="app">
      <TopBar pets={pets} setPets={setPets} setActivePet={setActivePet} />
        <div className="main-content">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage pets={pets} setPets={setPets} setActivePet={setActivePet} />} />
              <Route path="/pedigree" element={<PedigreePage />} />
              <Route path="/petshop" element={<PetShopPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </div>
        </div>

        {activePet && (
          <PetProfileModal
            pet={activePet}
            onClose={() => setActivePet(null)}
            editable={false}
            posts={[]} // optional posts if needed
          />
        )}
      </div>
    </Router>
  );
}

export default App;
