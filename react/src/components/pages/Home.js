import React from 'react';
// import '../../App.css';
//import Cards from '../../Cards';
// import HeroSection from '../HeroSection';
//import Footer from '../../Footer';
// import React from 'react';
import '../../App.css';
import { Button } from '../Buttons';
import { Button2 } from '../Buttons';
import '../HeroSection.css';
import { Link } from 'react-router-dom';
// import React, { useState, useEffect } from 'react';

function Home() {
  return (
    <div className='hero-container'>
    <video src='/videos/video-3.mp4' autoPlay loop muted />
    <h1>WELCOME TO LABRATS</h1>
    <p>Science is waiting for you!</p>
    <div className='hero-btns'>
    <Button
        className='btns'
        buttonStyle='btn--primary'
        buttonSize='btn--large'
        onClick={console.log('hey')}
      >
        <Link to='/login'></Link>
        Login
      </Button>
      
      
      <Button2
        className='btns'
        buttonStyle='btn--primary'
        buttonSize='btn--large'
        onClick={console.log('hey')}
      >
        <Link to='/register'></Link>
        Register
      </Button2>
    </div>
  </div>
  );
}

export default Home;
