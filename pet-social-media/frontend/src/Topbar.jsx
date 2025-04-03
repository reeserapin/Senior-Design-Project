import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const TopbarContainer = styled.div`
  background-color: #099EC8;
  color: white;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  height: 60px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
`;

const LeftContent = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Logo = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const ProfileLink = styled(Link)`
  text-decoration: none;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 5px;
  border: 2px solid black;
`;

const PlusIcon = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  position: absolute;
  right: 50px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  padding: 5px 15px;
  transition: all 0.3s ease;
  width: 300px;

  &:focus-within {
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
  }
`;

const SearchBar = styled.input`
  background: transparent;
  border: none;
  color: white;
  padding: 8px;
  width: 100%;
  font-size: 14px;
  outline: none;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const SearchButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const SearchIcon = styled.img`
  width: 20px;
  height: 20px;
  filter: brightness(0) invert(1);
`;

const SearchResults = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
  display: ${props => props.show ? 'block' : 'none'};
`;

const SearchResultItem = styled.div`
  padding: 10px 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const ResultImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const ResultInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ResultName = styled.span`
  font-weight: 500;
  color: #333;
`;

const ResultType = styled.span`
  font-size: 12px;
  color: #666;
`;

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
  font-size: 20px;
  color: #000;
`;

const PopupContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 300px;
`;

const PopupInputFile = styled.input`
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ddd;
  cursor: pointer;
`;

const PopupButton = styled.button`
  padding: 10px 20px;
  background-color: #9DD8EA;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #87bcd8;
  }
`;

const PopupClose = styled.button`
  padding: 10px 20px;
  background-color: #ccc;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #bbb;
  }
`;

const PopupImagePreview = styled.img`
  max-width: 200px;
  max-height: 200px;
  margin: 10px 0;
  border-radius: 8px;
`;

function TopBar() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const [query, setQuery] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [catImages, setCatImages] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length > 0) {
      // Mock search results - replace with actual API call
      setSearchResults([
        {
          id: 1,
          name: "Max the Golden Retriever",
          type: "Pet Profile",
          image: "/golden_retriever_pfp.jpg"
        },
        {
          id: 2,
          name: "Pet Shop - Premium Food",
          type: "Store",
          image: "/petshop.jpg"
        },
        {
          id: 3,
          name: "Dog Training Tips",
          type: "Article",
          image: "/training.jpg"
        }
      ]);
      setShowResults(true);
    } else {
      setShowResults(false);
      setSearchResults([]);
    }
  };

  const handleResultClick = (result) => {
    // Handle navigation to the selected result
    console.log('Selected:', result);
    setShowResults(false);
    setQuery('');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImage = () => {
    if (selectedImage) {
      setCatImages((prevImages) => [...prevImages, selectedImage]);
      setIsPopupOpen(false);
      setSelectedImage(null);
    } else {
      alert("Please select an image first.");
    }
  };

  return (
    <TopbarContainer>
      <LeftContent>
        <Logo>Pet-igree</Logo>
        {!isLoginPage && (
          <>
            <ProfileLink to="/petprofile">
              <ProfileImage src="/golden_retriever_pfp.jpg" alt="Profile" />
            </ProfileLink>
            {catImages.map((image, index) => (
              <ProfileLink to={`/petprofile/${index}`} key={index}>
                <ProfileImage src={image} alt={`Cat Profile ${index}`} />
              </ProfileLink>
            ))}
            <PlusIcon
              src="/pluscircle.png"
              alt="Add"
              onClick={() => setIsPopupOpen(true)}
            />
          </>
        )}
      </LeftContent>
      {!isLoginPage && (
        <SearchContainer>
          <SearchBar
            type="text"
            placeholder="Search pets, shops, articles..."
            value={query}
            onChange={handleSearch}
            onFocus={() => query.length > 0 && setShowResults(true)}
            onBlur={() => setTimeout(() => setShowResults(false), 200)}
          />
          <SearchButton onClick={() => handleSearch({ target: { value: query } })}>
            <SearchIcon src="/search.png" alt="Search" />
          </SearchButton>
          <SearchResults show={showResults}>
            {searchResults.map((result) => (
              <SearchResultItem
                key={result.id}
                onClick={() => handleResultClick(result)}
              >
                <ResultImage src={result.image} alt={result.name} />
                <ResultInfo>
                  <ResultName>{result.name}</ResultName>
                  <ResultType>{result.type}</ResultType>
                </ResultInfo>
              </SearchResultItem>
            ))}
          </SearchResults>
        </SearchContainer>
      )}

      {!isLoginPage && isPopupOpen && (
        <Popup>
          <PopupContent>
            <h2>New Pet?</h2>
            <h4>Enter a code to transfer pet account or create a new account by uploading pet info.</h4>
            <h3>What is your pet's name?</h3>
            <h3>Upload a profile picture:</h3>
            <PopupInputFile
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {selectedImage && (
              <div>
                <h3>Image Preview:</h3>
                <PopupImagePreview src={selectedImage} alt="Selected Cat" />
              </div>
            )}
            <PopupButton onClick={handleAddImage}>
              Add Pet
            </PopupButton>
            <PopupClose onClick={() => setIsPopupOpen(false)}>
              Close
            </PopupClose>
          </PopupContent>
        </Popup>
      )}
    </TopbarContainer>
  );
}

export default TopBar;
