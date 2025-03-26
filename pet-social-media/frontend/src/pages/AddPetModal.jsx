// components/AddPetModal.jsx
import React, { useState } from "react";
import "../styles/AddPetModal.css";

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
