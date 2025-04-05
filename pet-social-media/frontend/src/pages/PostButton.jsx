import React, { useState } from 'react';
import { IoIosTennisball } from 'react-icons/io';
import { MdAddAPhoto } from "react-icons/md";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import ReactDOM from 'react-dom';
import { useUser } from '../UserContext';

const PostButton = ({ pets = [], onPost }) => {
  const { followedPets } = useUser();  // Access followed pets from context
  console.log("Followed pets inside PostButton:", followedPets);

  const [isOpen, setIsOpen] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [caption, setCaption] = useState('');
  const [taggedPets, setTaggedPets] = useState([]);
  const [taggedFollowedPets, setTaggedFollowedPets] = useState([]); 
  const [isHoveringUpload, setIsHoveringUpload] = useState(false);  // State for hover effect
  const [isHoveringTennisBall, setIsHoveringTennisBall] = useState(false);

  // Prevent scrolling when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup in case the component unmounts while open
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map(file => URL.createObjectURL(file));
    setPhotos(prev => [...prev, ...urls]);
  };

  const handleSubmit = () => {
    if (photos.length > 0 || caption.trim()) {
      onPost?.({ 
        images: photos, 
        caption, 
        taggedPets, 
        taggedFollowedPets 
      });

      // Reset form fields
      setIsOpen(false);
      setPhotos([]);
      setCaption('');
      setTaggedPets([]);
      setTaggedFollowedPets([]);
    }
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
        style={{
          background: 'none',
          border: 'none',
          padding: '10px',
          cursor: 'pointer',
          borderRadius: '50%',
        }}
        title="New Post"
      >
        <IoIosTennisball
          className="pulse-hover"
          style={{
            fontSize: '48px',
            color: '#2ecc71',
          }}
        />
      </button>

      {/* Popup Modal */}
      {isOpen &&
        ReactDOM.createPortal(
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

              {/* Tag Followed Pets */}
              <div style={{ width: '100%', marginBottom: '10px' }}>
                <p style={{ marginBottom: '5px' }}>Tag followed pets:</p>
                <div style={styles.petRow}>
                  {followedPets.map((pet, i) => (
                    <img
                      key={`followed-${i}`}
                      src={pet.image}
                      alt={pet.name}
                      title={pet.name}
                      style={{
                        ...styles.petImage,
                        border: taggedFollowedPets.some(p => p.name === pet.name)
                          ? '3px dashed #fff'
                          : '2px solid white'
                      }}
                      onClick={() => toggleTagFollowedPet(pet)}
                    />
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div style={styles.buttonRow}>
                <button onClick={() => setIsOpen(false)} style={styles.cancel}>Cancel</button>
                <button onClick={handleSubmit} style={styles.post}>Post</button>
              </div>
            </div>
          </div>,
          document.getElementById('modal-root')
        )
      }
    </div>
  );
};

export default PostButton;

// Styles
const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100vw', height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#948be1",
    padding: "20px",
    borderRadius: "12px",
    width: "600px",
    maxWidth: "90vw",
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
