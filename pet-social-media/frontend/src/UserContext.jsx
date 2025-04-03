// src/UserContext.jsx
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState(null); // default: null

  return (
    <UserContext.Provider value={{ profileImage, setProfileImage }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
