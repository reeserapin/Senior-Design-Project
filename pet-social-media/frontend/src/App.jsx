// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import TopBar from './Topbar';  
import PetProfilePage from './pages/Petprofilepage';
import Sidebar from './Sidebar';
import HomePage from './pages/Homepage';
import PedigreePage from './pages/Pedigreepage';
import PetShopPage from './pages/PetShoppage';
import ProfilePage from './pages/Profilepage';
import SettingsPage from './pages/Settingspage';
import LoginPage from './pages/LoginPage';

function AppContent() {
  return (
    <div className="ts-app">
      <TopBar />
      <div className="ts-main-content">
        <Sidebar />
        <div className="ts-content">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
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
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
