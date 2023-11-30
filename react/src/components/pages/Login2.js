// import React, {useState} from 'react';
import '../../App.css';
// import './Login.css';
import './RegisterInfo.css';
import React from 'react';
import { LoginResButton } from '../loginButton';

const Login = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // const handleEmailChange = (e) => {
    // setEmail(e.target.value);
  // };

  // const handlePasswordChange = (e) => {
    // setPassword(e.target.value);
  // };

  // const handleSubmit = (e) => {
    // e.preventDefault();
    // Add your logic to handle form submission (e.g., authentication) here
    // console.log('Email:', email);
    // console.log('Password:', password);

    // Sending form data to Flask backend using fetch
    // fetch('http://localhost:3000/login', { //TODO: send this to flask
      // method: 'POST',
      // headers: {
        // 'Content-Type': 'application/json',
      // },
      // body: JSON.stringify({ email, password }),
    // })
      // .then(response => response.json())
      // .then(data => {
        // Handle the response from the Flask backend
        // console.log('Response from server:', data);
      // })
      // .catch(error => {
        // console.error('Error:', error);
      // });
  // };
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
