import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Importing Axios
import { FaCheck } from 'react-icons/fa';  // For Yes button
import { GiCrossedBones } from 'react-icons/gi';  // For No button
import Slider from 'react-slick';  // Importing react-slick
import 'slick-carousel/slick/slick.css';  // Slick Carousel styles
import 'slick-carousel/slick/slick-theme.css';  // Slick Carousel theme styles

const TransferPetButton = ({ pet }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState([]);  // State to hold fetched people data
  const [selectedPerson, setSelectedPerson] = useState(null);  // State for selected person

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  useEffect(() => {
    // Fetch 20 random users from the Random User Generator API
    axios.get('https://randomuser.me/api/?results=20')
      .then((response) => {
        setPeople(response.data.results);  // Store the fetched data in the state
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);  // Empty dependency array to fetch data only once on component mount

  const handleTransferClick = () => {
    setShowPopup(true);
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
    setShowOTP(false);
  };

  // Settings for the carousel
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    focusOnSelect: true,
    draggable: true,  // Enable mouse dragging
    swipe: true,      // Enable swipe gestures (for touch and mouse)
    swipeToSlide: true,  // Allow sliding to the next image by mouse scroll
  };
  

  const handleImageClick = (index) => {
    setSelectedPerson(index);  // Set the selected person when image is clicked
  };

  return (
    <div>
      <button onClick={handleTransferClick}>Transfer Pet</button>

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
            <p className="otp-instructions">Send this One time Password to the account you want to send this pet to!</p>

            {/* Carousel Section for Human Names and Images */}
            <div className="carousel-section">
              <Slider {...settings}>
                {people.map((person, index) => (
                  <div key={index} className="carousel-item">
                    <img
                      src={person.picture.large}
                      alt={person.name.first}
                      className={`carousel-image ${selectedPerson === index ? 'selected' : ''}`}
                      onClick={() => handleImageClick(index)}  // Handle image click
                    />
                    <p className="person-name">{person.name.first} {person.name.last}</p>
                  </div>
                ))}
              </Slider>
            </div>

            <button className="close-btn" onClick={handleCloseOTP}>Close</button>
          </div>
        </div>
      )}
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

.carousel-item {
  text-align: center;
  padding: 10px;
}

.carousel-image {
   width: 80px;
  height: 80px;
  border-radius: 50%;  /* Circular images */
  object-fit: cover;
  margin-bottom: 10px;
  cursor: pointer;
  transition: transform 0.3s ease, border 0.3s ease;
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
  font-size: 10px;  /* Ensure the names are sized correctly */
  font-weight: bold;
  color: #333;
  margin-top: 5px;
  white-space: nowrap;
  overflow: hidden;
  max-width: 80px;
}

/* OTP Popup Styling (Ensuring OTP styling is scoped) */
.otp-popup .otp-number {
  color: rgb(167, 40, 40); /* Darker red */
  font-size: 50px; /* Larger size for OTP number */
  font-weight: bold;
  margin: 10px 0;
}

.otp-popup .otp-text {
  color: #333;
  font-size: 30px;
}

.otp-popup .otp-instructions {
  color: #333;
  font-size: 20px;
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
  height: 100%;
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




`;
document.head.appendChild(style); 
