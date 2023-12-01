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
import Login from './components/pages/Login';
import HomepageRes from './components/pages/researcher/ResHomepage';
import HomepagePar from './components/pages/participant/ParHomepage';
import Posting from './components/pages/researcher/ResPostingForm';
import ParSearch from './components/pages/participant/ParSearch';
import ParProfile from './components/pages/participant/ParProfile';
import ResProfile from './components/pages/researcher/ResProfile';
import Test from './components/pages/researcher/ResPostingDetails';

function App() {
  const currentPath = window.location.pathname;

  // Add conditions based on your specific routes
  let navbarComponent;
  if (currentPath.startsWith('/par')) {
    navbarComponent = <NavbarPar />;
  } else if (currentPath.startsWith('/res')) {
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
          <Route path='/log-in' element={<Login />} />

          <Route path='/participant-register' element={<Participant />} />
          <Route path='/participant-homepage' element={<HomepagePar />} />
          <Route path='/participant-search' element={<ParSearch />} />
          <Route path='/participant-profile' element={<ParProfile />} />
          
          <Route path='/researcher-postingDetails' element={<Test />} />
          <Route path='/researcher-profile' element={<ResProfile />} />
          <Route path='/researcher-homepage' element={<HomepageRes />} />
          <Route path='/researcher-register' element={<Researcher />} />
          <Route path='/researcher-post-form' element={<Posting />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

