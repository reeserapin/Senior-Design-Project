import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const GlobalStyles = styled.div`
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background: #E8FAFF;
  overflow-x: hidden;
`;

const HomepageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  padding: 2vh 2%;
  background: #E8FAFF;
  position: relative;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
`;

const PostsContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2vh;
  padding-bottom: 2vh;
`;

const PetCard = styled.div`
  width: 90%;
  max-width: 32rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 2%;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 95%;
  }

  @media (max-width: 480px) {
    width: 98%;
  }
`;

const PetContentBox = styled.div`
  width: 95%;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 2%;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 98%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const PetHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1vh;
`;

const PetAvatar = styled.img`
  width: 5vh;
  height: 5vh;
  border-radius: 50%;

  @media (max-width: 768px) {
    width: 4vh;
    height: 4vh;
  }

  @media (max-width: 480px) {
    width: 3vh;
    height: 3vh;
  }
`;

const PetInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1vh;
`;

const PetPfpContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PetPfp = styled.img`
  width: 6vh;
  height: 6vh;
  border-radius: 50%;
  margin-left: -2vh;
  transition: transform 0.2s ease-in-out;

  &:first-child {
    margin-left: 0;
  }

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 5vh;
    height: 5vh;
  }

  @media (max-width: 480px) {
    width: 4vh;
    height: 4vh;
  }
`;

const PetTitle = styled.h2`
  font-size: 1.2em;
  font-weight: bold;
  white-space: nowrap;
`;

const PetImage = styled.img`
  width: 100%;
  max-height: 500px;
  border-radius: 8px;
  margin-bottom: 1vh;
  object-fit: contain;
  background-color: #f8f9fa;

  @media (max-width: 768px) {
    max-height: 400px;
  }

  @media (max-width: 480px) {
    max-height: 300px;
  }
`;

const PetActions = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1vh 0;
`;

const PetIcon = styled.i`
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`;

const CommentSection = styled.div`
  padding: 1.5%;
  background: #f9f9f9;
  border-radius: 8px;
  margin-top: 1vh;
`;

const CommentForm = styled.form`
  display: flex;
  align-items: center;
  gap: 1vh;
  margin-bottom: 1vh;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 1vh;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const CommentSubmit = styled.button`
  background: #099EC8;
  color: white;
  border: none;
  padding: 1vh 1.5vh;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #9DD8EA;
  }
`;

const CommentsList = styled.div`
  margin-top: 1vh;
`;

const Comment = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1vh;
  background: white;
  padding: 1vh;
  margin-top: 0.5vh;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const CommentPfp = styled.img`
  width: 4vh;
  height: 4vh;
  border-radius: 50%;

  @media (max-width: 480px) {
    width: 3vh;
    height: 3vh;
  }
`;

const CommentUsername = styled.span`
  font-weight: bold;
  font-size: 14px;
`;

const CommentText = styled.p`
  font-size: 14px;
  color: #333;
`;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ImageNav = styled.button`
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 12px;
  border: none;
  padding: 1vh;
  cursor: pointer;
  z-index: 1;

  &.left {
    left: 1%;
  }

  &.right {
    right: 1%;
  }
`;

const TextGray = styled.span`
  color: black;
`;

const TextRed = styled.span`
  color: red;
`;

function Homepage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, { text: newComment, user: 'Current User' }]);
      setNewComment('');
    }
  };

  const handleImageNavigation = (direction) => {
    setCurrentImageIndex(prevIndex => {
      if (direction === 'next') {
        return prevIndex + 1;
      } else {
        return prevIndex - 1;
      }
    });
  };

  return (
    <GlobalStyles>
      <HomepageContainer>
        <PostsContainer>
          <PetCard>
            <PetHeader>
              <PetAvatar src="/golden_retriever_pfp.jpg" alt="Pet Avatar" />
              <PetInfo>
                <PetTitle>Max the Golden Retriever</PetTitle>
                <PetPfpContainer>
                  <PetPfp src="/golden_retriever_pfp.jpg" alt="Pet Profile" />
                  <PetPfp src="/cat_pfp.jpg" alt="Pet Profile" />
                </PetPfpContainer>
              </PetInfo>
            </PetHeader>
            <ImageContainer>
              <PetImage src="/golden_retriever_pfp.jpg" alt="Pet Post" />
              <ImageNav className="left" onClick={() => handleImageNavigation('prev')}>
                &lt;
              </ImageNav>
              <ImageNav className="right" onClick={() => handleImageNavigation('next')}>
                &gt;
              </ImageNav>
            </ImageContainer>
            <PetActions>
              <PetIcon className="fas fa-heart" />
              <PetIcon className="fas fa-comment" />
              <PetIcon className="fas fa-share" />
            </PetActions>
            <CommentSection>
              <CommentForm onSubmit={handleCommentSubmit}>
                <CommentInput
                  type="text"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <CommentSubmit type="submit">Post</CommentSubmit>
              </CommentForm>
              <CommentsList>
                {comments.map((comment, index) => (
                  <Comment key={index}>
                    <CommentPfp src="/golden_retriever_pfp.jpg" alt="User" />
                    <div>
                      <CommentUsername>{comment.user}</CommentUsername>
                      <CommentText>{comment.text}</CommentText>
                    </div>
                  </Comment>
                ))}
              </CommentsList>
            </CommentSection>
          </PetCard>
        </PostsContainer>
      </HomepageContainer>
    </GlobalStyles>
  );
}

export default Homepage; 