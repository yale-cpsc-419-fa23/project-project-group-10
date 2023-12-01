import React from 'react';
import '../RegisterInfo.css';

const Researcher = () => {
  return (
    <div classNNmae="buffer">
    <div className="register-container">
      <h1>Please Register an Account</h1>
      <form action="/participant-register" method="POST">
      <div class="form-container">
        <div class="form-group">
          <label class="label">First Name:</label>
          <input required class="input-box" name="first_name" type="text" id="first_name"></input>
        </div>
        <div class="form-group">
          <label class="label">Last Name:</label>
          <input required class="input-box" name="last_name" type="text" id="last_name" ></input>
        </div>
        
        <div class="form-group">
          <label class="label">Email:</label>
          <input required class="input-box" name="email" type="text" id="email"></input>
        </div>

        <div class="form-group">
          <label class="label">Password:</label>
          <input required class="input-box" name="password" type="text" id="password"></input>
        </div>

        <div class="form-group">
          <label class="label">Confirm password:</label>
          <input required class="input-box" name="confirmation" type="text" id="confirmation"></input>
        </div>

      <br></br>
      <h1>Enter your information</h1>
        <div class="form-group">
          <label class="label">Are you associated with a lab? If so, please provide a link to your lab website: </label>
          <input class="input-box" name="lab" type="text" id="dob"></input>
        </div>
      </div>
      <input type="submit" value="Register" id="sendToServerButton"></input>
    </form>
    </div>
    </div>
  );
};

export default Researcher;