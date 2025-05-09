import React, { createContext, useContext, useState } from 'react';

// Create a Posts Context to manage posts data
const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const addPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]); // Add new post to the front of the posts array
  };

  return (
    <PostsContext.Provider value={{ posts, addPost }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => useContext(PostsContext);
