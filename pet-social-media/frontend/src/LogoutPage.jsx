import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LogoutPageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #E8FAFF;
  padding: 20px;
`;

const LogoutContainer = styled.div`
  display: flex;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  width: 800px;
  height: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    height: auto;
  }
`;

const GrassBackground = styled.div`
  flex: 1;
  background: linear-gradient(to bottom, #9DD8EA 0%, #84BC41 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60%;
    background: url('/grass-pattern.png') repeat;
    background-size: 200px;
    opacity: 0.3;
  }

  @media (max-width: 768px) {
    height: 200px;
  }
`;

const DogIllustration = styled.div`
  position: absolute;
  width: 150px;
  height: 150px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: url('/dog-illustration.png') no-repeat center;
  background-size: contain;
`;

const LogoutForm = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
`;

const FormText = styled.p`
  color: #666;
  margin-bottom: 30px;
  font-size: 1.1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const CancelButton = styled(Button)`
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;

  &:hover {
    background-color: #eee;
  }
`;

const LogoutButton = styled(Button)`
  background-color: #099EC8;
  color: white;
  border: none;

  &:hover {
    background-color: #0789ac;
  }
`;

function LogoutPage() {
  return (
    <LogoutPageContainer>
      <LogoutContainer>
        <GrassBackground>
          <DogIllustration />
        </GrassBackground>
        <LogoutForm>
          <FormTitle>Logout</FormTitle>
          <FormText>Are you sure you want to logout?</FormText>
          <ButtonGroup>
            <Link to="/">
              <CancelButton>Cancel</CancelButton>
            </Link>
            <Link to="/login">
              <LogoutButton>Logout</LogoutButton>
            </Link>
          </ButtonGroup>
        </LogoutForm>
      </LogoutContainer>
    </LogoutPageContainer>
  );
}

export default LogoutPage; 