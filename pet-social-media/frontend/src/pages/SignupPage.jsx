import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/LoginPage.css';

const API_BASE = "http://localhost:5000";

function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    retypePassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.retypePassword) {
      alert("Passwords do not match.");
      return;
    }

    const payload = {
      email: formData.email,
      username: formData.username,
      password1: formData.password,
      password2: formData.retypePassword,
      user_type: "User", // optional toggle later
    };

    try {
      const response = await fetch(`${API_BASE}/auth/sign-up`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Signup successful:", result);
        navigate('/home');
      } else {
        const err = await response.json();
        console.error("Signup failed:", err);
        alert(err?.error || "Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("An error occurred during signup.");
    }
  };

  return (
    <div className="lg-login-page">
      <div className="lg-login-container">
        <div className="lg-grass-background">
          <div className="lg-dog-illustration"></div>
        </div>
        <div className="lg-login-form">
          <div className="lg-form-container">
            <h2>Sign up</h2>
            <form onSubmit={handleSubmit}>
              <div className="lg-form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="lg-form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="lg-form-group">
                <label htmlFor="password">Password</label>
                <div className="lg-password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
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
              <div className="lg-form-group">
                <label htmlFor="retypePassword">Retype Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="retypePassword"
                  id="retypePassword"
                  value={formData.retypePassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="lg-signup-button">
                Sign up →
              </button>
              <p style={{ textAlign: 'center', marginTop: '15px' }}>
                Already have an account? <Link to="/">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
