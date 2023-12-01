// import React, {useState} from 'react';
import '../../App.css';
// import './Login.css';
import './RegisterInfo.css';
// import { Button } from '../loginButton';
// import { Link } from 'react-router-dom';
import React from 'react';
// import { LoginResButton } from '../loginButton';

const Login = () => {
  return (
      <div className="login-container">
        <div className="register-container">

          <h1>Welcome Back :)</h1>

          <form action="/log-in" method="POST">
            <div className="form-container">
              <div class="form-group">
                <label class= "label">Email:</label>
                <input required class="input-box" name="email" type="text" id="email"></input>
              </div>
              </div>
              <div className="form-container">
            <div class="form-group">
              <label class= "label">Password:</label>
              <input required class="input-box" name="password" type="text" id="password"></input>
            </div>
          </div>
          <input type="submit" value="Login" id="sendToServerButton"></input>
          </form>
        </div>
      </div>

  );
}

export default Login;
