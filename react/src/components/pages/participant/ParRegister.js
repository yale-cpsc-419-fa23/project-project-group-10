import React from 'react';
import '../RegisterInfo.css';

const Participant = () => {
  return (
    <div className="buffer">
    <div className="register-container">
      <h1>Please Register an Account</h1>
      <form action="/register-participant" method="POST">
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
      <p>These questions are completely optional. Your answers will help us match you with trials.</p>
        <div class="form-group">
          <label class="label">Date of Birth:</label>
          <input class="input-box" name="dob" type="text" id="dob"></input>
        </div>
        <div class="form-group">
            <label class="label">Sex:</label>
            <select name="sex" id="sex">
                <option disabled selected value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
        </div>
        <div class="form-group">
            <label class="label">Do you drink?</label>
            <select name="drink" id="drink">
                <option disabled selected value="">Select</option>
                <option value="male">Yes</option>
                <option value="female">No</option>
            </select>
        </div>
        <div class="form-group">
            <label class="label">Do you smoke?</label>
            <select name="smoke" id="smoke">
                <option disabled selected value="">Select</option>
                <option value="male">Yes</option>
                <option value="female">No</option>
            </select>
        </div>
        <div class="form-group">
            <label class="label">Do you have any diseases or a medical history of diseases?</label>
            <input class="input-box" name="diseases" type="text" id="diseases"></input>
        </div>
      </div>
      <input type="submit" value="Register" id="sendToServerButton"></input>
    </form>
    </div>
    </div>
  );
};

export default Participant;