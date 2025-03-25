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
    <div className="pet-popup-overlay" onClick={onClose}>
      <div className="pet-popup" onClick={(e) => e.stopPropagation()}>
        <h3>Add New Pet</h3>
        <input
          type="text"
          placeholder="Enter pet name"
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="preview"
            style={{ width: "150px", height: "150px", borderRadius: "50%" }}
          />
        )}
        <div style={{ marginTop: "10px" }}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave} disabled={!petName || !imagePreview}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPetModal;
