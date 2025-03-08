import React from "react";
import { FaPaw, FaFlag, FaComment, FaPaperPlane } from "react-icons/fa";
import "../styles/Homepage.css"; 

const posts = [
  {
    user: "Leslie Mosier",
    avatar: "./doug_the_pug/LeslieMosier.jpg",
    images: ["./doug_the_pug/doug_post.jpg"],
    petNames: ["Teddy", "Daisy"],
    title: "Doug the Pug",
    bgColor: "bg-blue"
  },
  {
    user: "Mason Animal Shelter",
    avatar: "shelter-avatar.png",
    images: ["rocky.png"],
    petNames: ["Rocky"],
    title: "Rocky",
    bgColor: "bg-green"
  },
  {
    user: "Grace Hopper",
    avatar: "grace-avatar.png",
    images: ["kittens.png"],
    petNames: ["kittens"],
    title: "kittens",
    bgColor: "bg-yellow"
  }
];

const PetPost = ({ user, avatar, images, petNames, title, bgColor }) => {
  return (
    <div className={`pet-card ${bgColor}`}>
      <div className="pet-header">
        <img src={avatar} alt={user} className="pet-avatar" />
        <p className="pet-title">{user}</p>
      </div>
      <h2 className="pet-title">{title}</h2>
      <div>
        {images.map((img, index) => (
          <img key={index} src={img} alt={petNames[index]} className="pet-image" />
        ))}
      </div>
      <div className="pet-actions">
        <FaPaw className="pet-icon text-red-500" />
        <FaComment className="pet-icon" />
        <FaPaperPlane className="pet-icon" />
        <FaFlag className="pet-icon text-gray-500" />
      </div>
    </div>
  );
};

const PetPosts = () => {
  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      {posts.map((post, index) => (
        <PetPost key={index} {...post} />
      ))}
    </div>
  );
};

export default PetPosts;
