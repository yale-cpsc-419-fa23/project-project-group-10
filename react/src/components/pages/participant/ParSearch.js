// import React from 'react';
import '../../../App.css';
import '../../HeroSection.css';
import '../RegisterInfo.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Dropdown from 'react-bootstrap/Dropdown';
import React, { useState } from 'react';
import { Modal, Button, Card, Row, Col } from 'react-bootstrap'

const Widget = ({ data, onClick }) => {
    return (
      <Col sm={4}>
        <Card style={{ margin: '10px' }}>
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
    return (
      <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{data.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{data.details}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="secondary" onClick={onHide}>
            Favorite
          </Button>
          <Button variant="secondary" onClick={onHide}>
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
  
  function ParSearch() {
    const [selectedAge, setSelectedAge] = useState('Age');
    const [selectedSex, setSelectedSex] = useState('Sex');
    // details_string = "Location(s): SSS, Timeline: 09/09/2023 - 10/10/24, Compensation: $10/hr, Duration: 90mins"
    // TODO: GET SERVER DATA BACK
    const serverData = [
      { id: 1, title: 'Sleep Study', description: 'a study on how drinking affects your sleep', details: "Location(s): SSS, Timeline: 09/09/2023 - 10/10/24, Compensation: $10/hr, Duration: 90mins, Age Group: 0-18, Sex: Open to All, Related to Drinking",  },
      { id: 2, title: 'Computer Science Trial', description: 'Interact with our newly updated Shutter robot.', details: "Location(s): Remote, Timeline: 01/13/2022 - 11/11/24, Compensation: $5/hr, Duration: 10mins, Age Group: Open to All, Sex: Open to All",  },
      
      // { id: 2, title: 'Item 2', description: 'Description 2', details: 'Details 2' },
      // Add more items as needed
    ];
    
  
    const handleAgeSelect = (eventKey) => {
      setSelectedAge(eventKey);
    };
  
    const handleSexSelect = (eventKey) => {
      setSelectedSex(eventKey);
    };
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Get the form data
      const formData = new FormData(e.target);
  
      // Append selectedAge and selectedSex to the form data
      formData.append('selectedAge', selectedAge);
      formData.append('selectedSex', selectedSex);
  
      // TODO: SEND it to server
      fetch('/participant-search', {
        method: 'POST',
        body: formData,
      })
        // TODO: get it back FROM server
        .then((response) => response.json()) // adjust based on your server response
        .then((data) => {
          // Handle the response from the server
          console.log(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };
  
    return (
      <div>
        <div className='hero-container'>
          <h1 className="register-title">Search for Studies</h1>
          <form action="/participant-search" method="POST">
            <div className="form-container">
              <center>
                <div className="small_buff">
                  <div style={{ display: 'inline-block', marginRight: '10px' }}>
                    <Dropdown onSelect={handleAgeSelect}>
                      <Dropdown.Toggle variant="success" id="age-dropdown">
                        {selectedAge}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item eventKey="Under 18">Under 18</Dropdown.Item>
                        <Dropdown.Item eventKey="18+">18+</Dropdown.Item>
                        <Dropdown.Item eventKey="All Ages">All Ages</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
  
                  <div style={{ display: 'inline-block' }}>
                    <Dropdown onSelect={handleSexSelect}>
                      <Dropdown.Toggle variant="success" id="sex-dropdown">
                        {selectedSex}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item eventKey="Female">Female</Dropdown.Item>
                        <Dropdown.Item eventKey="Male">Male</Dropdown.Item>
                        <Dropdown.Item eventKey="All">All</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                <input className="input-box" name="search" type="text" id="search"></input>
                <input type="submit" value="search" id="sendToServerButton"></input>
              </center>
            </div>
          </form>
        </div>
        <div className="grid-container">
        <WidgetGrid serverData={serverData} />
      </div>
      </div>
    );
  }
  
  export default ParSearch;