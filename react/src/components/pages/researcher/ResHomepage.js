import React from 'react';
import '../../../App.css';
import '../../HeroSection.css';
import { Link } from 'react-router-dom';
import { Button3 } from '../../Buttons';
// import HomeSection from HomepageRes
// import { Link } from 'react-router-dom';

function HomepageRes() {
    return  (
        <div>
            <div className='home-container'>
           {/* TODO: change this video or none at all, just lil graphics */}
       {/* <video src='/videos/video-3.mp4' autoPlay loop muted />  */}
       {/* <img src="../images/researchers4.jpg" alt="Example" /> */}
       <h1>WELCOME HOME</h1>
       {/* TODO: something better here */}
       <p>Your research is looking good</p>
       <Link to='/researchertrial'>
      <button className="register-button participant">Sign Up</button>
      </Link>
       {/* <div className='hero-btns'>
         <Button3
           className='btns'
           buttonStyle='btn--outline'
           buttonSize='btn--large'
         >
           <Link to='/researchertrial'></Link>
           List a New Study! 
         </Button3> */}
         {/* <Button2
           className='btns'
           buttonStyle='btn--primary'
           buttonSize='btn--large'
           onClick={console.log('hey')}
            > 
            <Link to='/researchertrial'></Link>
           List a new study!
         </Button2> */}
       </div>
     </div>
    // </dixv>
    );

}

export default HomepageRes
