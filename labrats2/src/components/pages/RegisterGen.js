import React, {useEffect} from 'react';
import './RegisterGen.css';
import { Link } from 'react-router-dom';


function Register() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="register-container">
    <h1 className="register-title">Register</h1>
    <div className="buttons-container">
    <Link
                to='/register-participant'
              >
      <button className="register-button participant">Register as a Participant</button>
      </Link>
      <Link
                to='/register-researcher'
              >
      <button className="register-button researcher">Register as a Researcher</button>
      </Link>
    </div>
  </div>
  );
}

export default Register;
