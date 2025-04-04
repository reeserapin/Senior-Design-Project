import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LoginPageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #E8FAFF;
  padding: 20px;
`;

const LoginContainer = styled.div`
  display: flex;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  width: 800px;
  height: 600px;
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

const LoginForm = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 30px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #f5f5f5;

  &:focus {
    outline: none;
    border-color: #099EC8;
    background-color: white;
  }
`;

const PasswordInput = styled.div`
  position: relative;
`;

const ShowPassword = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  font-size: 0.9rem;
  color: #666;
  cursor: pointer;
`;

const CheckboxInput = styled.input`
  width: auto;
  margin-right: 5px;
`;

const SignupButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #099EC8;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;

  &:hover {
    background-color: #0789ac;
  }
`;

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <LoginPageContainer>
      <LoginContainer>
        <GrassBackground>
          <DogIllustration />
        </GrassBackground>
        <LoginForm>
          <FormTitle>Welcome to Pet-igree</FormTitle>
          <FormGroup>
            <FormLabel>Email</FormLabel>
            <FormInput type="email" placeholder="Enter your email" />
          </FormGroup>
          <FormGroup>
            <FormLabel>Password</FormLabel>
            <PasswordInput>
              <FormInput
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
              />
              <ShowPassword onClick={() => setShowPassword(!showPassword)}>
                <CheckboxInput
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                Show Password
              </ShowPassword>
            </PasswordInput>
          </FormGroup>
          <SignupButton>Sign In</SignupButton>
          <p style={{ textAlign: 'center', marginTop: '20px' }}>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </LoginForm>
      </LoginContainer>
    </LoginPageContainer>
  );
}

export default LoginPage; 