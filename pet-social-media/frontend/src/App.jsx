import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './pages/Topbar';  
import PetProfilePage from './pages/Petprofilepage';
import Sidebar from './pages/Sidebar';
import HomePage from './pages/Homepage';
import PedigreePage from './pages/Pedigreepage';
import PetShopPage from './pages/PetShoppage';
import ProfilePage from './pages/Profilepage';
import SettingsPage from './pages/Settingspage';

function App() {
  const [pets, setPets] = useState([
    {
      name: "Sparky",
      image: "https://arrowtpets.com/wp-content/uploads/2023/05/Understanding-Goldendoodle-Behavior_-Common-Traits-and-Personality.png"
    },
    {
      name: "Spot",
      image: "https://www.humaneworld.org/sites/default/files/styles/responsive_3_4_500w/public/2020-07/dog-509745.jpg.webp?itok=tVo9pIsi"
    },
    {
      name: "Snowy",
      image: "https://puzzlemania-154aa.kxcdn.com/products/2024/puzzle-ravensburger-1500-pieces-white-kitten.webp"
    }
  ]);

  return (
    <Router>
      <div className="app">
        <TopBar pets={pets} setPets={setPets} />
        <div className="main-content">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/petprofile" element={<PetProfilePage />} />
              <Route path="/profile" element={<ProfilePage pets={pets} setPets={setPets} />} />
              <Route path="/pedigree" element={<PedigreePage />} />
              <Route path="/petshop" element={<PetShopPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
