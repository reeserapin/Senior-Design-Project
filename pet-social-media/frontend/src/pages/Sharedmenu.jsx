import { useState } from "react";

const SharePopup = ({ users, onShare, onClose }) => {
  const [sharedUsers, setSharedUsers] = useState({});

  const handleShare = (user) => {
    setSharedUsers((prev) => ({ ...prev, [user.id]: true }));
    onShare(user);
  };

  return (
    <div className="share-section">
      <div className="share-header">
        <span className="share-title">Share with</span>
        <button 
          className="close-button"
          onClick={onClose}
        >
          ×
        </button>
      </div>
      <div className="share-content">
        {users.map((user) => (
          <div
            key={user.id}
            className="share-user-item"
          >
            <img
              src={user.image}
              alt={user.name}
              className="user-avatar"
            />
            <span className="user-name">{user.name}</span>
            <button
              className={`share-action-button ${sharedUsers[user.id] ? 'shared' : ''}`}
              onClick={() => handleShare(user)}
              disabled={sharedUsers[user.id]}
            >
              {sharedUsers[user.id] ? "Shared" : "Share"}
            </button>
          </div>
        ))}
      </div>
      <style jsx>{`
        .share-section {
          padding: 10px;
          background: #f9f9f9;
          border-radius: 8px;
          margin-top: 10px;
        }

        .share-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .share-title {
          font-weight: bold;
          font-size: 14px;
        }

        .close-button {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #666;
          padding: 0 4px;
        }

        .close-button:hover {
          color: #333;
        }

        .share-content {
          max-height: 160px;
          overflow-y: auto;
        }

        .share-user-item {
          display: flex;
          align-items: center;
          gap: 10px;
          background: white;
          padding: 6px;
          margin-top: 5px;
          border-radius: 5px;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        }

        .user-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }

        .user-name {
          flex: 1;
          font-size: 14px;
          font-weight: bold;
        }

        .share-action-button {
          padding: 4px 8px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 12px;
          transition: background-color 0.2s;
        }

        .share-action-button:not(.shared) {
          background: #099EC8;
          color: white;
        }

        .share-action-button:not(.shared):hover {
          background: #9DD8EA;
        }

        .share-action-button.shared {
          background-color: #9ca3af;
          color: white;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default SharePopup;