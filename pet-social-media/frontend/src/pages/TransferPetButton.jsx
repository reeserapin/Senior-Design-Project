import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheck } from 'react-icons/fa';
import { GiCrossedBones } from 'react-icons/gi';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { TbTransferIn } from "react-icons/tb";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TransferPetButton = ({ pet }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedPersonName, setSelectedPersonName] = useState(null);
  const [hasTransferred, setHasTransferred] = useState(false);  // Track if the pet has been transferred

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  useEffect(() => {
    axios.get('https://randomuser.me/api/?results=20')
      .then((response) => {
        setPeople(response.data.results);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleTransferClick = () => {
    if (!hasTransferred) {  // Only show the popup if the transfer hasn't been done
      setShowPopup(true);
    }
  };

  const handleYesClick = () => {
    setLoading(true);
    setTimeout(() => {
      setOtp(generateOTP());
      setShowOTP(true);
      setLoading(false);
    }, 3000);
  };

  const handleNoClick = () => {
    setShowPopup(false);
  };

  const handleCloseOTP = () => {
    setShowOTP(false);  // Close the OTP popup
    
    // Display success toast notification
    if (selectedPersonName) {
      toast.success(`You transferred your pet to ${selectedPersonName}!`);
    }

    // Mark the pet as transferred and prevent the transfer popup from appearing again
    setHasTransferred(true);
    setShowPopup(false);  // Close the transfer popup as well
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    focusOnSelect: true,
    draggable: true,
    swipe: true,
    swipeToSlide: true,
  };

  const handleImageClick = (index) => {
    setSelectedPerson(index);
    setSelectedPersonName(people[index].name.first + ' ' + people[index].name.last);
  };

  return (
    <div>
      <button className="transfer-button" onClick={handleTransferClick}>Transfer Pet</button>

      {showPopup && !showOTP && (
        <div className="popup">
          <div className="popup-content">
            <p>Are you sure you want to transfer {pet.name}?</p>
            <button className="yes-button" onClick={handleYesClick}>
              <FaCheck /> Yes
            </button>
            <button className="no-button" onClick={handleNoClick}>
              <GiCrossedBones /> No
            </button>
          </div>
        </div>
      )}

      {loading && (
        <div className="loading-popup">
          <div className="loading-content">
            <p>Loading...</p>
            <div className="spinner"></div>
          </div>
        </div>
      )}

      {showOTP && (
        <div className="otp-popup">
          <div className="otp-popup-content">
            <p className="otp-text">Your OTP:</p>
            <p className="otp-number">{otp}</p>
            <p className="otp-instructions">Send this One Time Password to the account you want to send this pet to!</p>

            <div className="carousel-section">
              <Slider {...settings}>
                {people.map((person, index) => (
                  <div key={index} className="carousel-item">
                    <img
                      src={person.picture.large}
                      alt={person.name.first}
                      className={`carousel-image ${selectedPerson === index ? 'selected' : ''}`}
                      onClick={() => handleImageClick(index)}
                    />
                    <p className="person-name">{person.name.first}</p>
                  </div>
                ))}
              </Slider>
            </div>

            {selectedPersonName && (
              <p className="selected-person-text">
                You will transfer to {selectedPersonName}
              </p>
            )}

            <button className="close-btn" onClick={handleCloseOTP}><TbTransferIn /> Transfer!</button>
          </div>
        </div>
      )}

      {/* ToastContainer to show the toast notifications */}
      <ToastContainer position="top-center" />
    </div>
  );
};

export default TransferPetButton;



const style = document.createElement('style');
style.innerHTML =  `
/* Carousel Section Styling */
.carousel-section {
  margin-top: 20px;
  width: 100%;
}
 .transfer-button {
  background-color: #28a745; /* Green color */
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.transfer-button:hover {
  background-color: #218838; /* Darker green on hover */
}


.carousel-item {
  text-align: center;
  padding: 10px;
}

.carousel-image {
   max-width: 80px;
  max-height: 80px;
  border-radius: 50% !important;
  object-fit: cover;
  margin-bottom: 10px;
}

/* Highlight the selected image */
.carousel-image.selected {
  border: 3px solid #28a745;  /* Green border for selected image */
  transform: scale(1.2);  /* Slight zoom effect when selected */
}

.carousel-image:hover {
  transform: scale(1.1);  /* Slight zoom effect on hover */
}

.person-name {
  font-size: 15px !important;  /* Ensure the names are sized correctly */
  font-weight: bold;
  color: #333;
  margin-top: 5px;
  white-space: nowrap;
  overflow: hidden;
  max-width: 80px;
}

/* Styling for the selected person's name */
.selected-person-text {
  font-size: 20px !important;
  font-weight: bold;
  margin-top: 15px;
  color: #333;
}

/* Existing OTP Styling */
.otp-number {
  color: rgb(167, 40, 40); /* Darker red */
  font-size: 50px !important; /* Ensure font size is set */
  font-weight: bold;
  margin: 10px 0;
}

.otp-text {
  color: #333;
  font-size: 30px !important;
}

.otp-instructions {
  color: #333;
  font-size: 20px !important;
  margin: 10px 0;
}

/* Popup Background */
.popup, .otp-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.6); /* Semi-transparent overlay */
  z-index: 1000;
}

/* Loading Popup Styling */
.loading-popup {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001; /* Ensure it's above the other popups */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 110%;
}

.loading-content {
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  max-width: 400px;
  width: 100%;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #28a745; /* Green color */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-top: 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Popup Container */
.popup-content, .otp-popup-content, .loading-content {
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  max-width: 400px;
  width: 100%;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

/* Popup Title */
.popup-content p, .otp-popup-content p, .loading-content p {
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
}

/* Yes Button (Green with Checkmark) */
.yes-button {
  margin: 10px;
  padding: 10px 20px;
  background-color: #28a745; /* Green */
  color: #fff;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.yes-button:hover {
  background-color: #218838; /* Darker green on hover */
}

.yes-button svg {
  margin-right: 8px;
}

/* No Button (Red with Cross) */
.no-button {
  margin: 10px;
  padding: 10px 20px;
  background-color: #dc3545; /* Red */
  color: #fff;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.no-button:hover {
  background-color: #c82333; /* Darker red on hover */
}

.no-button svg {
  margin-right: 8px;
}

/* OTP Popup Styling */
.otp-popup {
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  text-align: center;
  padding: 20px;
}

.otp-popup-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 400px;
  width: 100%;
  padding: 20px;
}

.otp-popup-content p {
  color: #333;
  font-size: 30px; /* Increased size for OTP */
  margin: 10px 0;
}

.otp-popup-content p.otp-number {
  color: #a72828; /* Darker red */
  font-size: 50px; /* Larger size for OTP number */
  font-weight: bold;
  margin: 10px 0;
}

/* Close Button for OTP Popup */
.otp-popup-content .close-btn {
  margin-top: 20px;
  padding: 8px 15px;
  background-color: #ff6666;
  border-radius: 8px;
  color: white;
  border: none;
  cursor: pointer;
}

.otp-popup-content .close-btn:hover {
  background-color: #cc3333;
}

/* Loading Popup Styling */
.loading-popup {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001; /* Ensure it's above the other popups */
}

.loading-content {
  font-size: 20px;
  color: #333;
}

.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #28a745; /* Green color */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-top: 10px;
}

`;
document.head.appendChild(style); 
