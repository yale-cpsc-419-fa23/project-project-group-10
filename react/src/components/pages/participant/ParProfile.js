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
import React, { useState } from 'react';
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
        navigate("/participant-signup");
      
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

    const serverData = [
        { id: 1, title: 'Sleep Study - favorite', description: 'a study on how drinking affects your sleep', details: "Location(s): SSS, Timeline: 09/09/2023 - 10/10/24, Compensation: $10/hr, Duration: 90mins, Age Group: 0-18, Sex: Open to All, Related to Drinking",  },
        { id: 2, title: 'Computer Science Trial - favorite', description: 'Interact with our newly updated Shutter robot.', details: "Location(s): Remote, Timeline: 01/13/2022 - 11/11/24, Compensation: $5/hr, Duration: 10mins, Age Group: Open to All, Sex: Open to All",  },
      ];


    return (
        <div>
            <div className="hero-container">
                <h1>hey you, your favorites</h1>

                {/* <p>participant dummy photo here</p> */}
                {/* TODO: create a link buttonn to listed favorites - do a jinja thing?  */}
                {/* <p>favorites</p>  */}
                
            </div>
            <div className="grid-container">
        <WidgetGrid serverData={serverData} />
      </div>
        </div>
    )
}
export default ParProfile