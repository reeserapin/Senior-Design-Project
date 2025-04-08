import React, { useState } from 'react';

function SettingsPage() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChangeForm, setShowChangeForm] = useState(false);

  const [emailNotifs, setEmailNotifs] = useState(false);
  const [notifTypes, setNotifTypes] = useState({
    follows: false,
    petTags: false,
    comments: false,
    adoptionUpdates: false,
  });

  const handleToggle = (key) => {
    setNotifTypes((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="settings-wrapper">
      <div className="settings-card">
        <h1>Settings</h1>
        <p className="subtitle">Manage your privacy and notifications.</p>

        {/* === Privacy Section === */}
        <div className="section-card">
          <h2 onClick={() => setShowPrivacy(!showPrivacy)}>
            Privacy <span>{showPrivacy ? '▲' : '▼'}</span>
          </h2>
          {showPrivacy && (
            <label className="checkbox-label">
              <input type="checkbox" /> Make profile private
            </label>
          )}
        </div>

        {/* === Email Notification Section === */}
        <div className="section-card">
          <h2 onClick={() => setShowNotifications(!showNotifications)}>
            Email Notifications <span>{showNotifications ? '▲' : '▼'}</span>
          </h2>

          {showNotifications && (
            <div>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={emailNotifs}
                  onChange={() => setEmailNotifs(!emailNotifs)}
                />
                Enable email notifications
              </label>

              {emailNotifs && (
                <div className="notif-box">
                  <p className="notif-header">Email me when:</p>

                  {[
                    { key: 'follows', label: 'Follower notifications' },
                    { key: 'petTags', label: 'Tag notifications' },
                    { key: 'comments', label: 'Comment notifications' },
                    { key: 'adoptionUpdates', label: 'Adoption updates' },
                  ].map(({ key, label }) => (
                    <div key={key} className="checkbox-row">
                      <input
                        type="checkbox"
                        id={key}
                        checked={notifTypes[key]}
                        onChange={() => handleToggle(key)}
                      />
                      <label htmlFor={key}>{label}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* === Account Actions Section === */}
        <div className="section-card">
          {!showChangeForm ? (
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button className="primary-button" onClick={() => setShowChangeForm(true)}>
                Change Password
              </button>
              <button
                className="danger-button"
                onClick={() => {
                  const confirmed = window.confirm("Are you sure you want to delete your account? This cannot be undone.");
                  if (confirmed) {
                    alert("✅ Account deletion confirmed (frontend only).");
                  }
                }}
              >
                Delete My Account
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const confirmChange = window.confirm("Are you sure you want to change your password?");
                if (confirmChange) {
                  alert("✅ Password changed (frontend only).");
                  setShowChangeForm(false);
                }
              }}
              className="form-stack"
            >
              <input type="password" placeholder="Current Password" required />
              <input type="password" placeholder="New Password" required />
              <input type="password" placeholder="Confirm New Password" required />
              <div className="button-row">
                <button type="submit" className="primary-button">Update Password</button>
                <button type="button" onClick={() => setShowChangeForm(false)} className="cancel-button">Cancel</button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Inline styles */}
      <style jsx>{`
        .settings-wrapper {
          background-color: #e6f6fb;
          min-height: 100vh;
          padding: 2rem;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }

        .settings-card {
          background: white;
          border-radius: 10px;
          padding: 2rem;
          width: 100%;
          max-width: 600px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        h1 {
          font-size: 1.75rem;
          margin-bottom: 0.5rem;
        }

        .subtitle {
          color: #666;
          margin-bottom: 1.5rem;
        }

        .section-card {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.08);
          padding: 1.5rem;
          margin-top: 1.5rem;
        }

        h2 {
          font-size: 1.2rem;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.75rem;
        }

        .notif-box {
          background: #f9f9f9;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 1rem;
          margin-top: 1rem;
        }

        .notif-header {
          font-weight: bold;
          margin-bottom: 0.75rem;
        }

        .checkbox-row {
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .primary-button {
          background-color: #099EC8;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
        }

        .primary-button:hover {
          background-color: #0bb8e0;
        }

        .cancel-button {
          background-color: #ddd;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
        }

        .danger-button {
          background-color: #dc3545;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
        }

        .danger-button:hover {
          background-color: #c82333;
        }

        .form-stack {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .form-stack input {
          padding: 0.5rem;
          border-radius: 5px;
          border: 1px solid #ccc;
        }

        .button-row {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  );
}

export default SettingsPage;
