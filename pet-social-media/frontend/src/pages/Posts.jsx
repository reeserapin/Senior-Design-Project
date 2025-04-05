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

                <div className="tagged-pets">
                  {post.taggedPets?.map((pet, i) => (
                    <img
                      key={`own-${i}`}
                      src={pet.image}
                      alt={pet.name}
                      className="post-profile"
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid white',
                        marginLeft: i > 0 ? -10 : 0,
                        zIndex: post.taggedPets.length - i,
                        position: 'relative',
                      }}
                    />
                  ))}

                  {post.taggedFollowedPets?.map((pet, i) => (
                    <img
                      key={`followed-${i}`}
                      src={pet.image}
                      alt={pet.name}
                      className="post-profile"
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px dashed #948be1',
                        marginLeft: i > 0 ? -8 : 0,
                        zIndex: post.taggedFollowedPets.length - i,
                        position: 'relative',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="posts-grid">
          {posts.map((post, index) => (
            <div key={index} className="post-card">
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

                <div className="tagged-pets">
                  {post.taggedPets?.map((pet, i) => (
                    <img
                      key={`own-${i}`}
                      src={pet.image}
                      alt={pet.name}
                      className="post-profile"
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid white',
                        marginLeft: i > 0 ? -10 : 0,
                        zIndex: post.taggedPets.length - i,
                        position: 'relative',
                      }}
                    />
                  ))}

                  {post.taggedFollowedPets?.map((pet, i) => (
                    <img
                      key={`followed-${i}`}
                      src={pet.image}
                      alt={pet.name}
                      className="post-profile"
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px dashed #948be1',
                        marginLeft: i > 0 ? -8 : 0,
                        zIndex: post.taggedFollowedPets.length - i,
                        position: 'relative',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Posts;
