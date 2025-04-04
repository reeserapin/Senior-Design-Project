import React, { useState } from 'react';
import { IoIosTennisball } from 'react-icons/io';
import { MdAddAPhoto } from "react-icons/md";

const PostButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [caption, setCaption] = useState('');
  const [taggedPets, setTaggedPets] = useState('');
  const [taggedUsers, setTaggedUsers] = useState('');
  const [isHoveringUpload, setIsHoveringUpload] = useState(false);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map(file => URL.createObjectURL(file));
    setPhotos(prev => [...prev, ...urls]);
  };

  const handleSubmit = () => {
    alert(`Posted!\nPhotos: ${photos.length}\nCaption: ${caption}\nTagged Pets: ${taggedPets}\nTagged Users: ${taggedUsers}`);
    setIsOpen(false);
    setPhotos([]);
    setCaption('');
    setTaggedPets('');
    setTaggedUsers('');
  };

  return (
    <div>
      {/* Tennis ball button */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '32px',
          color: '#2ecc71',
        }}
        title="New Post"
      >
        <IoIosTennisball />
      </button>

      {/* Popup Modal */}
      {isOpen && (
        <div style={styles.overlay} onClick={() => setIsOpen(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginBottom: "12px" }}>Create Post</h2>

            {/* Uploaded Images */}
            {photos.length > 0 && (
              <div style={styles.previewGrid}>
                {photos.map((src, index) => (
                  <img key={index} src={src} alt={`upload-${index}`} style={styles.image} />
                ))}
              </div>
            )}

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
              <MdAddAPhoto
                size={48}
                style={{
                  ...styles.uploadIcon,
                  color: isHoveringUpload ? "#333" : "#555",
                }}
              />
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

            {/* Tag pets */}
            <input
              type="text"
              placeholder="Tag your pet (e.g., Milo, Luna)"
              value={taggedPets}
              onChange={(e) => setTaggedPets(e.target.value)}
              style={styles.input}
            />

            {/* Tag users */}
            <input
              type="text"
              placeholder="Tag other accounts (e.g., @joeschmoe)"
              value={taggedUsers}
              onChange={(e) => setTaggedUsers(e.target.value)}
              style={styles.input}
            />

            {/* Post + Cancel */}
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

// 💅 Inline styles
const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
    alignItems: 'center', justifyContent: 'center', zIndex: 1000,
  },
  modal: {
    backgroundColor: "#948be1",
    padding: "20px",
    borderRadius: "12px",
    width: "400px",
    maxHeight: "90vh",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "white",
    transition: "height 0.3s ease",
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
  uploadIcon: {
    transition: "color 0.3s ease",
  },
  previewGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
    gap: "10px",
    width: "100%",
    marginBottom: "10px",
  },
  image: {
    width: '100%',
    height: '180px',
    borderRadius: '12px',
    objectFit: 'cover',
    marginBottom: '10px',
  },
  
  textarea: {
    padding: '10px',
    minHeight: '80px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    resize: 'vertical',
    width: '100%',
    marginBottom: '10px',
  },
  input: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    marginBottom: '10px',
    width: '100%',
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
    width: '100%',
  },
  cancel: {
    backgroundColor: '#ccc',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  post: {
    backgroundColor: '#2ecc71',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};
