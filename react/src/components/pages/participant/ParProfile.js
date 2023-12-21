// import React from 'react';
// import '../../../App.css';
// import '../../HeroSection.css';
// import { Link } from 'react-router-dom';
// import React from 'react';
import '../../../App.css';
import '../../HeroSection.css';
import '../RegisterInfo.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Dropdown from 'react-bootstrap/Dropdown';
import React, { useState, useEffect } from 'react';
import { Modal, Button, Card, Row, Col } from 'react-bootstrap'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Widget = ({ data, onClick }) => {
    return (
      <Col sm={4}>
        <Card style={{ margin: '5px' }}>
          <Card.Body>
            <Card.Title>{data.title}</Card.Title>
            <Card.Text>{data.description}</Card.Text>
            <Button variant="primary" onClick={() => onClick(data)}>
              View Details
            </Button>
          </Card.Body>
        </Card>
      </Col>
    );
  };
  // Modal component
  const MyVerticallyCenteredModal = ({ data, show, onHide }) => {
    const navigate = useNavigate();
    const handleUnfavorite = () => {
      // pass in selected file
      axios.post('http://127.0.0.1:5000/unfavorite', {data})
      .then(function (response) {
        console.log(response); 
        navigate("/unfavorite");
      })
    };
    const handleSignup = () => {
      // pass in selected file
      axios.post('http://127.0.0.1:5000/participant-signup', {})
      .then(function (response) {
        console.log(response); 
        navigate("/participant-search");
      
      })
    };

    // THE ACTUAL CODE WE WANT WHEN WE GET IT TO WORK
    return (
      <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{data.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p><strong>Department:</strong> {data.department}</p>
        <p><strong>Description:</strong> {data.description}</p>
        <p><strong>Location:</strong> {data.location}</p>
        {data.drink && (<p><strong>Is drinking relevant?:</strong> {data.drink}</p>)}
        {data.smoke && (<p><strong>Is smoking relevant?:</strong> {data.smoke}</p>)}
        {data.diseases && (<p><strong>Medical History of important?:</strong> {data.diseases}</p>)}
        {data.race && (<p><strong>Race (if relevant):</strong> {data.race}</p>)}
        {data.compensation && (<p><strong>Compensation: $</strong>{data.compensation}</p>)}
        {data.duration && (<p><strong>Duration:</strong> {data.duration} minutes</p>)}
        {data.times && (<p><strong>Time:</strong> {data.times} </p>)}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUnfavorite}>
            Unfavorite
          </Button>
          <Button variant="secondary" onClick={handleSignup} style={{ backgroundColor: '#4169E1' }}>
            Signup
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  // Main component
  const WidgetGrid = ({ serverData }) => {
    const [modalShow, setModalShow] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
  
    const handleWidgetClick = (data) => {
      setSelectedData(data);
      setModalShow(true);
    };
  
    return (
      <div>
        <Row>
          {serverData.map((item) => (
            <Widget key={item.id} data={item} onClick={handleWidgetClick} />
          ))}
        </Row>
  
        {selectedData && (
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            data={selectedData}
          />
        )}
      </div>
    );
  };


  function ParProfile() {
    const [serverData, setServerData] = useState([]);
    const [token, setToken] = useState('');
  
    useEffect(() => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      }
  
      // Fetch data from the Flask server when the component mounts
      axios.post('http://127.0.0.1:5000/all_favorites', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log('Fetched data:', response.data);
          setServerData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, [token]);

    return (
      <div>
        {/* Your JSX content goes here */}
        <div className="hero-container" style={{ background: '#4169E1' }}>
          <h1>hey you, your favorites</h1>
          <div className="grid-container">
          {/* Render your components using the fetched data */}
          <WidgetGrid serverData={serverData} />
        </div>
        </div>
      </div>
    );
  }
  

export default ParProfile