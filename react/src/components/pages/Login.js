import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';
import './RegisterInfo.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const logInUser = () => {
    if (email.length === 0) {
      alert("Email has been left blank!");
    } else if (password.length === 0) {
      alert("Password has been left blank!");
    } else {
      axios.post('http://127.0.0.1:5000/login', {
        email: email,
        password: password
      })
      .then(function (response) {
        console.log(response);
        const userInfo = response.data.user_info; // Assuming the response has 'user_info'

        // Check the user role obtained from the response
        if (userInfo.role === 0) {
          navigate("/researcher-homepage");
        } else if (userInfo.role === 1) {
          navigate("/participant-homepage");
        } else {
          // Handle other roles or unexpected scenarios
          alert("Unknown role, unable to redirect.");
        }
      })
      .catch(function (error) {
        console.log(error, 'error');
        if (error.response && error.response.status === 401) {
          alert("Invalid credentials");
        }
      });
    }
  };

  return (
    <div className="login-container">
      <div className="register-container-login">
        <h1>Welcome Back :)</h1>
        <br></br>
        <form>
          <div className="form-container">
            <div className="form-group">
            <label className="label" for="email">Email:</label>
              <input
                required
                className="input-box"
                name="email"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="form-container">
            <div className="form-group">
            <label className="label" for="password">Password:</label>
              <input
                required
                className="input-box"
                name="password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button type="button" className="custom-primary" onClick={logInUser} >Login</button>
          <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/register" className="link-danger">Register</a></p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;