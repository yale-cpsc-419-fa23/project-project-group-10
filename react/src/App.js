import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/AboutUs';
import Register from './components/pages/RegisterGen';
import Participant from './components/pages/RegisterPar';
import Researcher from './components/pages/RegisterRes';
import Login from './components/pages/Login';
import HomepageRes from './components/pages/HomepageRes';
// import Posting from './components/pages/PostingForm';
// import Navbar2 from './components/Navbar2';

function App() {
  // const location = useLocation();

  // const showNavbar = () => {
  //   const hideNavbarRoutes = ['/register-participant', '/register-researcher'];
  //   return !hideNavbarRoutes.includes(location.pathname);
  // };


  return (
    <>
      <Router>
      {/* {showNavbar() && <Navbar />} */}
      <Navbar />

        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/about' exact element={<About />} />
          <Route path='/register' exact element={<Register />} />
          <Route path='/register-participant' exact element={<Participant />} />
          <Route path='/register-researcher' exact element={<Researcher />} />
          <Route path='/log-in' exact element={<Login />} />
          <Route path='/homePageRes' exact element={<HomepageRes />} />
          {/* <Route path='/post-form' exact element={<Posting />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
