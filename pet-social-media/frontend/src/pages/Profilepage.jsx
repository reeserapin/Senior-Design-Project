import React, { useState, useRef } from "react";
import Cropper from "react-easy-crop";
import Sidebar from "../Sidebar";
import "../styles/Profilepage.css";

function ProfilePage() {
  const [banner, setBanner] = useState(null);
  const [cropping, setCropping] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setBanner(reader.result);
      reader.readAsDataURL(file);
      setCropping(true);
    }
  };

  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleApplyCrop = () => {
    // Crop the image using canvas (or backend)
    setCropping(false);
  };

  return (
    <div className="profile-container">
      <Sidebar />
      <main className="profile-main">
        {/* Banner Section */}
        <div className="profile-banner">
          {banner ? (
            <img src={banner} alt="Banner" className="banner-image" />
          ) : (
            <span>Upload a banner</span>
          )}
          <button className="upload-button" onClick={() => fileInputRef.current.click()}>
            Upload
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>

        {/* Cropping Modal */}
        {cropping && (
          <>
            <div className="cropper-overlay"></div>
            <div className="cropper-modal">
              <h3>Adjust Your Banner</h3>
              <div className="cropper-container">
                <Cropper
                  image={banner}
                  crop={crop}
                  zoom={zoom}
                  aspect={3} // Keep aspect ratio wide like a banner
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={handleCropComplete}
                />
              </div>
              <div className="cropper-buttons">
                <button className="cancel-button" onClick={() => setCropping(false)}>
                  Cancel
                </button>
                <button className="apply-button" onClick={handleApplyCrop}>
                  Apply
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default ProfilePage;
