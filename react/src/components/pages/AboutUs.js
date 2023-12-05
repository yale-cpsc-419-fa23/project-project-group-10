import React from 'react';
import '../../App.css';
import './About.css';
import MouseGradientBackground from '../MouseGradient';



function About() {
  return (
    <MouseGradientBackground>
    <div className="about-container">
      <h1>About Us</h1>
      <p className="about-text">
        Welcome to LabRats! We created this website to connect clinical trials to interested participants. We are all Labrats one way or another!
      </p> 

        <br></br>
        <h2>Team</h2>
      
      <div className="team-members">
        <div className="team-member">
          <div className="circle">
            <img src="jessica_le_image_url.jpg" alt="Jessica Le" />
          </div>
          <h3>Jessica Le</h3>
        </div>
        <div className="team-member">
          <div className="circle">
            <img src="jessica_le_image_url.jpg" alt="Aly Moosa" />
          </div>
          <h3>Aly Moosa</h3>
        </div>
        <div className="team-member">
          <div className="circle">
            <img src="jessica_le_image_url.jpg" alt="Jennifer Truong" />
          </div>
          <h3>Jennifer Truong</h3>
        </div>
        <div className="team-member">
          <div className="circle">
            <img src="/images/ari.png" alt="Ariana Delgado" />
          </div>
          <h3>Ariana Delgado</h3>
        </div>
      </div>
    </div>
    </MouseGradientBackground>
  );
}

export default About;

