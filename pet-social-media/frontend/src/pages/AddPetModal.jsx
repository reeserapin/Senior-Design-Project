import React, { useState } from "react";
import { MdAddAPhoto } from "react-icons/md";
import { LuDog } from "react-icons/lu";
import { IoLogoOctocat } from "react-icons/io5";

function AddPetModal({ onClose, onSave }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [petName, setPetName] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [type, setType] = useState("Dog");
  const [gender, setGender] = useState("Female");
  const [size, setSize] = useState("Medium");
  const [about, setAbout] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    if (petName && imagePreview) {
      onSave({
        name: petName,
        image: imagePreview,
        age,
        breed,
        type,
        gender,
        size,
        about,
        email,
        phone,
        location,
      });
      handleClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
   <div className="add-pet-modal-overlay" onClick={onClose}>
  <div className="add-pet-modal" onClick={(e) => e.stopPropagation()}>
    <h2>Add a New Pet</h2>
    <div className="modal-content">
      <div className="image-section">
        <label className="image-upload">
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="pet-preview" />
          ) : (
            <MdAddAPhoto size={30} className="upload-icon" />
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
      </div>

      <div className="form-section">
        <input type="text" placeholder="Pet Name" value={petName} onChange={(e) => setPetName(e.target.value)} />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option><LuDog /> Dog</option>
          <option><IoLogoOctocat /> Cat</option>
        </select>
        <input type="text" placeholder="Age" />
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option>Male</option>
              <option>Female</option>
            </select>
        <input type="text" placeholder="Breed" />
        <input type="text" placeholder="Weight" />
      </div>
    </div>

    <div className="modal-buttons">
      <button className="cancel" onClick={handleClose}>✕</button>
      <button className="save" onClick={handleSave} disabled={!petName || !imagePreview}>✓</button>
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
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.add-pet-modal {
  background: #c0ebff;
  padding: 30px;
  border-radius: 30px;
  width: 750px;
  max-width: 95%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

.modal-content {
  display: flex;
  gap: 30px;
  margin-top: 20px;
}

.image-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-upload {
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: #e0f7fa;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.image-upload:hover {
  background-color: #b3ecf5;
}

.image-upload input[type="file"] {
  display: none;
}

.pet-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.upload-icon {
  color: black;
  font-size: 32px;
}

.form-section {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-section input,
.form-section select,
.form-section textarea {
  padding: 12px 16px;
  border-radius: 20px;
  border: 1px solid #aaa;
  font-size: 15px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  transition: all 0.2s ease;
  background: white;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.05);
}


.form-section input:focus,
.form-section select:focus,
.form-section textarea:focus {
  border-color: #56cfe1;
  outline: none;
  box-shadow: 0 0 5px #a2e3f5;
}

textarea {
  min-height: 60px;
}

.modal-buttons {
  display: flex;
  justify-content: center;
  margin-top: 25px;
  gap: 40px;
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
`;

document.head.appendChild(style);