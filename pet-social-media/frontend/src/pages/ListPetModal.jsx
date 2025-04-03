// src/components/ListPetModal.jsx
import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const ListPetModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        tag: "",
        age: "",
        gender: "",
        size: "",
        breed: "",
        weight: "",
        color: "",
        status: "",
        description: "",
        adoption_images: [],
        contact_email: "",
        contact_phone: "",
        location: "",
        type: ""  
      });
      

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("petmodal-overlay")) {
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({ ...prev, adoption_images: imageUrls }));
  };

  const handleSubmit = () => {
    console.log("Pet submitted:", formData);
    onClose();
  };

  return (
    <>
      <style>{`
        .petmodal-overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.45);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .petmodal-content {
          background: #fff;
          padding: 2rem;
          border-radius: 16px;
          max-width: 1000px;
          width: 90%;
          position: relative;
        }
        .petmodal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          font-size: 1.4rem;
          background: none;
          border: none;
          cursor: pointer;
        }
        .petmodal-body {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .petmodal-image-section {
          flex: 1;
          background: #f0f0f0;
          padding: 1rem;
          border-radius: 12px;
        }
        .petmodal-form {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .petmodal-form input,
        .petmodal-form textarea,
        .petmodal-form select {
          padding: 0.5rem;
          font-size: 0.9rem;
          border: 1px solid #ccc;
          border-radius: 6px;
          width: 100%;
        }
        .petmodal-submit {
          padding: 0.8rem 1rem;
          background: black;
          color: white;
          border: none;
          border-radius: 6px;
          font-weight: bold;
          cursor: pointer;
        }
      `}</style>

      <div className="petmodal-overlay" onClick={handleBackdropClick}>
        <div className="petmodal-content">
          <button className="petmodal-close" onClick={onClose}><FaTimes /></button>
          <h2>List a New Pet</h2>
          <div className="petmodal-body">
            <div className="petmodal-image-section">
              <input type="file" multiple onChange={handleImageUpload} />
              {formData.adoption_images.map((src, i) => (
                <img key={i} src={src} alt="preview" style={{ width: 60, height: 60, borderRadius: 6, marginTop: 10 }} />
              ))}
            </div>

            <div className="petmodal-form">
              <input name="name" placeholder="Pet Name" value={formData.name} onChange={handleChange} />
              <input name="tag" placeholder="Pet Tag" value={formData.tag} onChange={handleChange} />
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="">Species</option>
                <option>Cat</option>
                <option>Dog</option>

                </select>

              <input name="age" type="number" placeholder="Age" value={formData.age} onChange={handleChange} />
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
              <select name="size" value={formData.size} onChange={handleChange}>
                <option value="">Size</option>
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
              <input name="breed" placeholder="Breed" value={formData.breed} onChange={handleChange} />
              <input name="weight" placeholder="Weight (lbs)" value={formData.weight} onChange={handleChange} />
              <input name="color" placeholder="Color" value={formData.color} onChange={handleChange} />
              <input name="status" placeholder="Vaccination Status" value={formData.status} onChange={handleChange} />
              <textarea name="description" placeholder="About..." value={formData.description} onChange={handleChange} />
              <input name="contact_email" placeholder="Contact Email" value={formData.contact_email} onChange={handleChange} />
              <input name="contact_phone" placeholder="Contact Phone" value={formData.contact_phone} onChange={handleChange} />
              <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
              <button className="petmodal-submit" onClick={handleSubmit}>Submit Pet</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListPetModal;
