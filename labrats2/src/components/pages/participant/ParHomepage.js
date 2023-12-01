import React from 'react';
import '../../../App.css';
import '../../HeroSection.css';
import { Link } from 'react-router-dom';

import { searchButton } from '../../Buttons';
// import HomeSection from HomepageRes
// import { Link } from 'react-router-dom';

function HomepagePar() {
    return  (
        <div>
                   <div className='hero-container'>
           {/* TODO: change this video or none at all, just lil graphics */}
       {/* <video src='/videos/video-3.mp4' autoPlay loop muted />  */}
       <h1>WELCOME HOME</h1>
       {/* TODO: something better here */}
       <p>something quirky here</p>
       <div className='hero-btns'>
         <searchButton
           className='btns'
           buttonStyle='btn--outline'
           buttonSize='btn--large'
         >
           <Link to='/researcher-post-form'></Link>
           Sign Up for a Study! 
         </searchButton>

         {/* <Button2 */}
           {/* // className='btns' */}
           {/* // buttonStyle='btn--primary' */}
           {/* // buttonSize='btn--large' */}
           {/* // onClick={console.log('hey')} */}
       {/* //   > */}
            {/* <Link to='/post-form'></Link> */}
           {/* List a new study!  */}
         {/* </Button2> */}
       </div>
     </div>
    </div>
    );

}

export default HomepagePar;
