// src/App.jsx
import React from 'react';
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
  return (
    <Router>
      <div className="app">
        <TopBar />
        <div className="main-content">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/petprofile" element={<PetProfilePage />} />
              <Route path="/profile" element={<ProfilePage />} />
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
