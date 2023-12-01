import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import './RegisterInfo.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // if (!response.ok) {
      //   throw new Error(`HTTP error! Status: ${response.status}`);
      // }

      const data = await response.json();

      console.log('Response from server:', data);

      if (data.error) {
        console.error('Error:', data.error);
      } else {
        if (data.user_info && data.user_info.isParticipant) {
          navigate('/participant-homepage');
        } else {
          navigate('/researcher-homepage');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
        <h1>Welcome Back ggfd :)</h1>
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
                type="password"
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