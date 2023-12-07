import React from 'react';
import NavbarGeneral from './components/NavbarGeneral';
import NavbarPar from './components/NavbarPar';
import NavbarRes from './components/NavbarRes';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/AboutUs';
import Register from './components/pages/RegisterGen';
import Participant from './components/pages/participant/ParRegister';
import Researcher from './components/pages/researcher/ResRegister';
import ResProfile from './components/pages/researcher/ResProfile';
import Login from './components/pages/Login';
import HomepageRes from './components/pages/researcher/ResHomepage';
import HomepagePar from './components/pages/participant/ParHomepage';
import Posting from './components/pages/researcher/ResPostingForm';
import ParSearch from './components/pages/participant/ParSearch';
import ParProfile from './components/pages/participant/ParProfile';
// import ResProfile from './components/pages/researcher/ResProfile';
// import Test from './components/pages/researcher/ResPostingDetails';
import Calendar from './components/pages/researcher/gcal';
import { useSession } from '@supabase/auth-helpers-react';
import { useEffect } from 'react';


function App() {
  const currentPath = window.location.pathname;
  const session = useSession();
  

  // useEffect(() => {
    // if (session && session.user) {
      // window.location.href = 'researcher-calendar';
    // }
  // }, [session]);

  // Add conditions based on your specific routes
  let navbarComponent;
  if (currentPath.startsWith('/participant')) {
    navbarComponent = <NavbarPar />;
  } else if (currentPath.startsWith('/researcher')) {
    navbarComponent = <NavbarRes />;
  } else {
    navbarComponent = <NavbarGeneral />;
  }

  // TODO: need to standardize the naming of each file
  // ex: all participants --> par---
  return (
    <>
      <Router>
        {navbarComponent}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register-participant' element={<Participant />} />
          <Route path='/register-research' element={<Researcher />} />

          <Route path='/researcher-calendar' element={<Calendar />} />
          <Route path='/participant-homepage' element={<HomepagePar />} />
          <Route path='/participant-signup' element={<HomepagePar />} />
          <Route path='/participant-search' element={<ParSearch />} />
          <Route path='/participant-profile' element={<ParProfile />} />
          <Route path='/researcher-profile' element={<ResProfile />} />
          <Route path='/researcher-homepage' element={<HomepageRes />} />
          <Route path='/researchertrial' element={<Posting />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

