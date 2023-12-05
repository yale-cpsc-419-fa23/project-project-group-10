import React from 'react';
// import '../../App.css';
//import Cards from '../../Cards';
// import HeroSection from '../HeroSection';
//import Footer from '../../Footer';
// import React from 'react';
import '../../App.css';
import { Button } from '../loginButton';
import { Button2 } from '../Buttons';
import '../HeroSection.css';
import { Link } from 'react-router-dom';
import './RegisterGen.css';
// import React, { useState, useEffect } from 'react';

function Home() {
  // const [data, setData] = useState([]);
  // useEffect(() => {
    // Make a GET request to your Flask backend
    // fetch('http://localhost:3000/', {
      // method: 'GET',
      // headers: {
        // 'Content-Type': 'application/json',
        // You can include additional headers if needed, like authorization headers
      // },
    // })
      // .then((response) => response.json())
      // .then((data) => {
        // Handle the data from the backend
        // setData(data);
      // })
      // .catch((error) => {
        // console.error('Error fetching data:', error);
      // });
  // }, []);
  return (
    <div className='hero-container'>
    <video src='/videos/video-3.mp4' autoPlay loop muted />
    <h1>WELCOME TO LABRATS</h1>
    <p>Science is waiting for you!</p>
    <div className='hero-btns'>
      <Button
        className='btns'
        buttonStyle='btn--outline'
        buttonSize='btn--large'
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
