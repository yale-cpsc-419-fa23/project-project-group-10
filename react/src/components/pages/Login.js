// import React, {useState} from 'react';
import '../../App.css';
// import './Login.css';
import './RegisterInfo.css';
import { Button } from '../loginButton';
import { Link } from 'react-router-dom';
import React, {useEffect} from 'react';
import { useState } from 'react'; // Import useState hook for managing state

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/log-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the Flask backend
        console.log('Response from server:', data);
        // Perform any necessary actions based on the response from the server
        // For example, handle redirection based on user role received in the response
        // Replace '/participant-homepage' and '/non-participant-homepage' with actual URLs
        if (data && data.isParticipant) {
          window.location.href = '/participant-homepage';
        } else {
          window.location.href = '/researcher-homepage';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle any errors that occur during the request
      });
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="login-container">
      <div className="register-container-login">
        <h1>Welcome Back :)</h1>
        <br></br>
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <div className="form-group">
              <label className="label">Email:</label>
              <input
                required
                className="input-box"
                name="email"
                type="text"
                id="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
          </div>
          <div className="form-container">
            <div className="form-group">
              <label className="label">Password:</label>
              <input
                required
                className="input-box"
                name="password"
                type="password" // Change input type to 'password'
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
          </div>
          <input type="submit" value="Login" id="sendToServerButton" />
        </form>
      </div>
    </div>
  );
};

export default Login;