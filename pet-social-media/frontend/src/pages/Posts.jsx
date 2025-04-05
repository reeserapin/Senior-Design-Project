import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaPaw, FaComment } from "react-icons/fa";
import { TbSend } from "react-icons/tb";
import "../styles/Posts.css";

const generatePostDate = (index) => {
  const daysAgo = index * 3 + Math.floor(Math.random() * 2);
  const postDate = new Date();
  postDate.setDate(postDate.getDate() - daysAgo);
  return postDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

function Posts({ posts = [], isCarousel = false }) {
  return (
    <>
      {isCarousel ? (
        <div className="posts-carousel">
          {posts.map((post, index) => (
            <div key={index} className="post-card carousel">
              {post.images.length === 1 ? (
  <img
    className="post-image"
    src={post.images[0]}
    alt="Single post"
  />
) : (
  <Slider {...sliderSettings}>
    {post.images.map((imgUrl, i) => (
      <img
        key={i}
        className="post-image"
        src={imgUrl}
        alt={`Slide ${i}`}
      />
    ))}
  </Slider>
)}

  

              <PostInfo post={post} index={index} />
            </div>
          ))}
        </div>
      ) : (
        <div className="posts-grid">
          {posts.map((post, index) => (
            <div key={index} className="post-card">
              {post.images.length === 1 ? (
                <img
                src={post.images[0]}
                alt="Post"
                className="post-image"
              />
              
              ) : (
                <Slider {...sliderSettings}>
                  {post.images.map((imgUrl, i) => (
                    <img
                      key={i}
                      className="post-image"
                      src={imgUrl}
                      alt={`Slide ${i}`}
                      style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "cover",
                        borderRadius: "12px",
                      }}
                    />
                  ))}
                </Slider>
              )}

              <PostInfo post={post} index={index} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function PostInfo({ post, index }) {
  return (
    <div className="post-info">
      <div className="post-text-icon-row">
        <div className="post-icons">
          <button className="icon-button"><FaPaw /></button>
          <button className="icon-button"><FaComment /></button>
          <button className="icon-button"><TbSend /></button>
        </div>
        <div className="post-text">
          <p><strong>{post.caption}</strong></p>
          <p className="timestamp">{post.date || generatePostDate(index)}</p>
        </div>
      </div>

      <div className="tagged-pets-row">
  {[...(post.taggedPets || []), ...(post.taggedFollowedPets || [])].map((pet, idx) => (
    <img
      key={idx}
      src={pet.image}
      alt={pet.name}
      className="tagged-pet-icon"
      style={{
        zIndex: 10 - idx, // ensures correct stacking
        marginLeft: idx === 0 ? 0 : -10,
        border: post.taggedFollowedPets?.some(p => p.name === pet.name)
          ? "2px dashed #948be1"
          : "2px solid white",
      }}
    />
  ))}
</div>

    </div>
  );
}


export default Posts;
