import React, { useState } from 'react';
import { IoIosTennisball } from 'react-icons/io';
import { MdAddAPhoto } from "react-icons/md";
import { IoIosRemoveCircleOutline } from "react-icons/io";

const PostButton = ({ pets, followedPets }) => {
    console.log("Followed pets inside PostButton:", followedPets);

  const [isOpen, setIsOpen] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [caption, setCaption] = useState('');
  const [taggedPets, setTaggedPets] = useState([]);
  const [taggedFollowedPets, setTaggedFollowedPets] = useState([]); // FIXED: defined in correct place
  const [isHoveringUpload, setIsHoveringUpload] = useState(false);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map(file => URL.createObjectURL(file));
    setPhotos(prev => [...prev, ...urls]);
  };

  const handleSubmit = () => {
    alert(`Posted!
Photos: ${photos.length}
Caption: ${caption}
Tagged Pets: ${taggedPets.map(p => p.name).join(', ')}
Tagged Followed Pets: ${taggedFollowedPets.map(p => p.name).join(', ')}
`);
  };

  const toggleTagPet = (pet) => {
    setTaggedPets(prev =>
      prev.find(p => p.name === pet.name)
        ? prev.filter(p => p.name !== pet.name)
        : [...prev, pet]
    );
  };

  const toggleTagFollowedPet = (pet) => {
    setTaggedFollowedPets(prev =>
      prev.find(p => p.name === pet.name)
        ? prev.filter(p => p.name !== pet.name)
        : [...prev, pet]
    );
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos(prev => prev.filter((_, i) => i !== indexToRemove));
  };

  return (
    <div>
      {/* Tennis Ball Button */}
      <button
        onClick={() => setIsOpen(true)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '32px', color: '#2ecc71' }}
        title="New Post"
      >
        <IoIosTennisball />
      </button>

      {/* Popup Modal */}
      {isOpen && (
        <div style={styles.overlay} onClick={() => setIsOpen(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginBottom: "12px" }}>Create Post</h2>

            {/* Uploaded Images Preview */}
            <div style={styles.imageGrid}>
              {photos.map((src, index) => (
                <div key={index} style={styles.imageWrapper}>
                  <img src={src} alt={`upload-${index}`} style={styles.previewImage} />
                  <IoIosRemoveCircleOutline
                    size={24}
                    color="red"
                    style={styles.deleteIcon}
                    onClick={() => handleRemovePhoto(index)}
                  />
                </div>
              ))}
            </div>

            {/* Upload Box */}
            <div
              style={{
                ...styles.uploadBox,
                backgroundColor: isHoveringUpload ? "#e0e0e0" : "#f9f9f9",
              }}
              onMouseEnter={() => setIsHoveringUpload(true)}
              onMouseLeave={() => setIsHoveringUpload(false)}
              onClick={() => document.getElementById('photo-upload').click()}
            >
              <MdAddAPhoto size={48} style={{ color: isHoveringUpload ? "#333" : "#555" }} />
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </div>

            {/* Caption */}
            <textarea
              placeholder="Write a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              style={styles.textarea}
            />

            {/* Tag Your Pets - clickable images */}
<div style={{ width: '100%', marginBottom: '10px' }}>
  <p style={{ marginBottom: '5px' }}>Tag your pet(s):</p>
  <div style={styles.petRow}>
    {pets.map((pet, i) => (
      <img
        key={i}
        src={pet.image}
        alt={pet.name}
        title={pet.name}
        style={{
          ...styles.petImage,
          border: taggedPets.some(p => p.name === pet.name)
            ? '3px solid #2ecc71'
            : '2px solid white'
        }}
        onClick={() => toggleTagPet(pet)}
      />
    ))}
  </div>
</div>



            {/* Post and Cancel Buttons */}
            <div style={styles.buttonRow}>
              <button onClick={() => setIsOpen(false)} style={styles.cancel}>Cancel</button>
              <button onClick={handleSubmit} style={styles.post}>Post</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostButton;
// Styles
const styles = {
    followedPetCarousel: {
        display: "flex",
        gap: "10px",
        overflowX: "auto",
        whiteSpace: "nowrap",
        paddingBottom: "5px",
        maxWidth: "100%",
        height: "80px", // ✅ force the height to keep it visible
      },
       
  overlay: {
    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
    alignItems: 'center', justifyContent: 'center', zIndex: 1000,
  },
  modal: {
    backgroundColor: "#948be1",
    padding: "20px",
    borderRadius: "12px",
    width: "600px", // you already had this
    maxWidth: "90vw", // ✅ ensure it doesn't break on small screens
    maxHeight: "90vh",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "white",
  },
  
  
  imageGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
    width: "100%",
    marginBottom: "10px",
  },
  imageWrapper: {
    position: "relative",
    width: "100%",
    height: "120px",
    overflow: "hidden",
    borderRadius: "8px",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "8px",
  },
  deleteIcon: {
    position: "absolute",
    top: "5px",
    right: "5px",
    cursor: "pointer",
    backgroundColor: "white",
    borderRadius: "50%",
  },
  uploadBox: {
    width: "100%",
    height: "180px",
    border: "2px dashed #ccc",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    marginBottom: "10px",
  },
  textarea: {
    padding: "10px",
    minHeight: "80px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    resize: "vertical",
    width: "100%",
    marginBottom: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    width: "100%",
    marginBottom: "10px",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginTop: "10px",
  },
  cancel: {
    backgroundColor: "#ccc",
    padding: "8px 16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  post: {
    backgroundColor: "#2ecc71",
    color: "white",
    padding: "8px 16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  petRow: {
    display: "flex",
    gap: "10px",
    overflowX: "auto",
    paddingBottom: "5px",
  },
  petImage: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    objectFit: "cover",
    cursor: "pointer",
  },
};
