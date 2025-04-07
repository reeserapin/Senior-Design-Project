import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/LoginPage.css';

function LoginPage({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoggedIn(true);         // ✅ simulate login
    navigate('/home');           // ✅ go to homepage
    // try {
    //   const response = await fetch('http://localhost:5000/auth/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     credentials: 'include', // Keep session cookies
    //     body: JSON.stringify(formData),
    //   });

    //   if (response.ok) {
    //     const result = await response.json();
    //     console.log('Login success:', result);
    //     navigate('/home'); // Redirect after login
    //   } else {
    //     const error = await response.json();
    //     console.error('Login failed:', error);
    //     alert(error?.error || 'Invalid email or password.');
    //   }
    // } catch (error) {
    //   console.error('Error during login:', error);
    //   alert('Error during login. Please try again.');
    // }
  };

  return (
    <div className="lg-login-page">
      <div className="lg-login-container">
      <div className="lg-grass-background">
          <div className="lg-dog-illustration"></div>
        </div>
        <div className="lg-login-form">
          <div className="lg-form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="lg-form-group">
                <label htmlFor="identifier">Email or Username</label>
                <input
                  type="text"
                  id="identifier"
                  name="identifier"
                  value={formData.identifier}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="lg-form-group">
                <label htmlFor="password">Password</label>
                <div className="lg-password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <label className="lg-show-password">
                    <input
                      type="checkbox"
                      checked={showPassword}
                      onChange={() => setShowPassword(!showPassword)}
                    />
                    Show Password
                  </label>
                </div>
              </div>
              <button type="submit" className="lg-signup-button">
                Login →
              </button>
              <p style={{ textAlign: 'center', marginTop: '15px' }}>
                Don't have an account? <Link to="/signup">Sign up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
