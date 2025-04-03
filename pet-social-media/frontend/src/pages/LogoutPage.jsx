import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LogoutPage.css';

function LogoutPage() {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Redirect to login page after successful logout
        navigate('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="logout-page">
      <div className="logout-container">
        <div className="lg-grass-background">
          <div className="lg-dog-illustration"></div>
        </div>
        <div className="logout-form">
          <h2>Sign out</h2>
          <p>Are you sure you want to sign out?</p>
          <div className="button-group">
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
            <button className="logout-button" onClick={handleLogout}>
              Sign out →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoutPage; 