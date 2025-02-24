// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './Topbar';  // Ensure correct import paths
import Sidebar from './Sidebar';
import HomePage from './Homepage';
import ProfilePage from './profilepage';
import SettingsPage from './Settingspage';

import './styles/global.css';  // Import global styles

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
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
