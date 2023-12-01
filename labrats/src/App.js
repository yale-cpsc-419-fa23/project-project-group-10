// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// import React from 'react';
// import NavbarGeneral from './components/NavbarGeneral';
// import NavbarPar from './components/NavbarPar';
// import NavbarRes from './components/NavbarRes';
// import './App.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './components/pages/Home';
// import About from './components/pages/AboutUs';
// import Register from './components/pages/RegisterGen';
// import Participant from './components/pages/RegisterPar';
// import Researcher from './components/pages/RegisterRes';
// import Login from './components/pages/Login';
// import HomepageRes from './components/pages/HomepageRes';
// import Posting from './components/pages/PostingForm';
// // import Navbar2 from './components/Navbar2';

// function App() {
//   // const location = useLocation();

//   // const showNavbar = () => {
//   //   const hideNavbarRoutes = ['/register-participant', '/register-researcher'];
//   //   return !hideNavbarRoutes.includes(location.pathname);
//   // };

//   const currentPath = window.location.pathname;

//     // Add conditions based on your specific routes
//     if (currentPath === '/register-participant') {
//       return <NavbarPar />;
//     } else if (currentPath.startsWith('/homepageRes')){
//       return <NavbarRes />;
//     } else {
//       return <NavbarGeneral />;
//     }
//   };

//   return (
//     <>
//       <Router>
//       {/* {showNavbar() && <Navbar />} */}
//         <Routes>
//           <Route path='/' exact element={<Home />} />
//           <Route path='/about' exact element={<About />} />
//           <Route path='/register' exact element={<Register />} />
//           <Route path='/register-participant' exact element={<Participant />} />
//           <Route path='/register-researcher' exact element={<Researcher />} />
//           <Route path='/log-in' exact element={<Login />} />
//           <Route path='/homePageRes' exact element={<HomepageRes />} />
//           <Route path='/post-form' exact element={<Posting />} />
//         </Routes>
//       </Router>
//     </>
//   );
//   }

// export default App;

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
import ResPostingDetails from './components/pages/researcher/ResPostingDetails';

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
          
          {/* <Route path='/researcher-postingDetails' element={<ResPostingDetails />} /> */}
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

