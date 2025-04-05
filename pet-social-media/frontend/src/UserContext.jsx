// src/UserContext.jsx
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState("/public/linkedGirl.jpg");

  // 🔥 Add this:
  const [followedPets, setFollowedPets] = useState([]);

  return (
    <UserContext.Provider value={{
      profileImage,
      setProfileImage,
      followedPets,
      setFollowedPets
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
