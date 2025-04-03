// src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { UserProvider } from './UserContext'; // ✅ correct path

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
