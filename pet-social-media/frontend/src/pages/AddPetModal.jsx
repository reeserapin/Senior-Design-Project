// components/AddPetModal.jsx
import React, { useState } from "react";

function AddPetModal({ onClose, onSave }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [petName, setPetName] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    if (petName && imagePreview) {
      onSave({ name: petName, image: imagePreview });
      onClose();
    }
  };

  return (
    <div className="add-pet-modal-overlay" onClick={onClose}>
      <div className="add-pet-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Add New Pet</h2>
        <div className="add-pet-form">
          <input
            type="text"
            placeholder="Enter pet name"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {/* 👇 PREVIEW IMAGE */}
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Pet Preview" />
          </div>
        )}

        <div className="modal-buttons">
          <button className="cancel" onClick={onClose}>✕</button>
          <button
            className="save"
            onClick={handleSave}
            disabled={!petName || !imagePreview}
          >
            ✓
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPetModal;


/* Embedded CSS */
const style = document.createElement('style');
style.innerHTML = `

.add-pet-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(100, 100, 100, 0.4);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.add-pet-modal {
  background-color: #c0ebff;
  padding: 40px;
  border-radius: 40px;
  width: 500px;
  max-width: 90%;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.add-pet-modal h2 {
  margin-bottom: 20px;
  color: #222;
  font-size: 24px;
  font-weight: 600;
}

.add-pet-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.add-pet-modal input[type="text"] {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 16px;
}

.add-pet-modal input[type="file"] {
  width: 100%;
  padding: 6px;
  border-radius: 10px;
  border: 1px solid #ccc;
  background-color: white;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 20px
}

.modal-buttons {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 20px;
}

.cancel,
.save {
  width: 50px;
  height: 50px;
  font-size: 24px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.cancel {
  background-color: #ff9999;
}

.save {
  background-color: #a5f5a3;
}

.cancel:hover,
.save:hover {
  transform: scale(1.1);
}

.save:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.post-icons {
  display: flex;
  gap: 12px;
}

.icon-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 6px;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.icon-button:hover {
  background-color: #f0f0f0;
}

.icon-button:active {
  transform: scale(0.95);
}

`;

document.head.appendChild(style);