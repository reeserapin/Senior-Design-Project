import React from 'react';
import Sidebar from '../Sidebar';
import '../styles/Profilepage.css';

function ProfilePage() {
  return (
    <div className="profile-container">
      <Sidebar /> {/* Sidebar now included */}
      <main className="profile-main">
        <header className="profile-header">
          {/* 🔥 FIX: Removed the extra <img> tag inside .profile-banner */}
          <div className="profile-banner"></div>  

          <div className="profile-info">
            <h1>John Doe</h1>
            <p>A passionate pet lover.</p>
            <div className="stats">
              <span>20.3K Followers</span>
              <span>489 Following</span>
              <span>308 Posts</span>
            </div>
          </div>
        </header>

        <section className="profile-details">
          <h3>Profile Information</h3>
          <ul>
            <li><strong>Name:</strong> John Doe</li>
            <li><strong>Email:</strong> johndoe@example.com</li>
            <li><strong>Bio:</strong> A passionate pet lover.</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default ProfilePage;
