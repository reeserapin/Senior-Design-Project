import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaPaw, FaComment } from "react-icons/fa";
import { TbSend } from "react-icons/tb";
import "../styles/Posts.css"; // make sure this contains both grid and carousel styles
import BackgroundCanvas from "./BackgroundCanvas";

const generatePostDate = (index) => {
  const daysAgo = index * 3 + Math.floor(Math.random() * 2); // Custom date logic
  const postDate = new Date();
  postDate.setDate(postDate.getDate() - daysAgo);
  return postDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
};

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false
};

function Posts({ postImages = [], captions = [], isCarousel = false }) {
  return (
    <>
      {isCarousel ? (
        <div className="posts-carousel">
          {postImages.map((imageSet, index) => (
            <div key={index} className="post-card carousel">
              <Slider {...sliderSettings}>
                {imageSet.map((imgUrl, i) => (
                  <img
                    key={i}
                    className="post-image"
                    src={imgUrl}
                    alt={`Slide ${i}`}
                  />
                ))}
              </Slider>

              <div className="post-info">
                <div className="post-text-icon-row">
                  <div className="post-icons">
                    <button className="icon-button"><FaPaw /></button>
                    <button className="icon-button"><FaComment /></button>
                    <button className="icon-button"><TbSend /></button>
                  </div>
                  <div className="post-text">
                    <p><strong>{captions[index % captions.length]}</strong></p>
                    <p className="timestamp">{generatePostDate(index)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="posts-grid">
          {postImages.map((imageSet, index) => (
            <div key={index} className="post-card">
              <Slider {...sliderSettings}>
                {imageSet.map((imgUrl, i) => (
                  <img
                    key={i}
                    className="post-image"
                    src={imgUrl}
                    alt={`Slide ${i}`}
                  />
                ))}
              </Slider>

              <div className="post-info">
                <div className="post-text-icon-row">
                  <div className="post-icons">
                    <button className="icon-button"><FaPaw /></button>
                    <button className="icon-button"><FaComment /></button>
                    <button className="icon-button"><TbSend /></button>
                  </div>
                  <div className="post-text">
                    <p><strong>{captions[index % captions.length]}</strong></p>
                    <p className="timestamp">{generatePostDate(index)}</p>
                  </div>
                </div>
                <img className="post-profile" src="/user.jpg" alt="User" />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Posts;
 