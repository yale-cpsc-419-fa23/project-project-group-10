// import React from 'react';
import '../../../App.css';
import axios from 'axios';
import '../../HeroSection.css';
import { useNavigate } from 'react-router-dom';
import '../RegisterInfo.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Dropdown from 'react-bootstrap/Dropdown';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal, Button, Card, Row, Col } from 'react-bootstrap'

const Widget = ({ data, onClick }) => {
    return (
      <Col sm={4}>
        <Card style={{ margin: '10px' }}>
          <Card.Body>
            <Card.Title>{data.title}</Card.Title>
            <Card.Text>{data.department}</Card.Text>
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
    const handleFavorite = () => {
      // pass in selected file
      axios.post('http://127.0.0.1:5000/favorite', {data})
      .then(function (response) {
        console.log(response); 
        navigate("/favorite");
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
          <Button variant="secondary" onClick={handleFavorite}> 
          {/*  */}
            Favorite
          </Button>
          <Button variant="secondary" onClick={handleSignup} style={{ backgroundColor: '#4169E1' }}>
            Signup
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

// Main component
const WidgetGrid = ({ serverData, selectedAge, selectedSex }) => {
    const [modalShow, setModalShow] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
  
    const handleWidgetClick = (data) => {
      setSelectedData(data);
      setModalShow(true);
    };
  
    // Filter data based on selectedAge and selectedSex
    const filteredData = serverData.filter((item) => {
        const isAgeMatch =
          selectedAge === "All Ages" || (item.ageGroup?.toLowerCase() || '').includes(selectedAge.toLowerCase());
        const isSexMatch =
          selectedSex === "All" || (item.sex?.toLowerCase() || '') === selectedSex.toLowerCase();
      
        return isAgeMatch && isSexMatch;
      });
      
    // Check if filters are applied before rendering widgets
    const widgetsToRender = filteredData.length > 0 ? filteredData : serverData;
  
    return (
      <div>
        <Row>
          {widgetsToRender.map((item) => (
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
    const [serverData, setServerData] = useState([]);
    const [selectedAge, setSelectedAge] = useState('All Ages');
    const [selectedSex, setSelectedSex] = useState('All');
  
    useEffect(() => {
      // Fetch data from the Flask server when the component mounts
      fetch('/fetch-data')  // Update the URL as needed
        .then((response) => response.json())
        .then((data) => setServerData(data))
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []);
  
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
    
        // Convert the form data to a JSON object
        const formDataObject = {};
        formData.forEach((value, key) => {
          formDataObject[key] = value;
        });
    
        // Make the fetch request with the correct headers
        fetch('/participant-search', {
          method: 'POST',
          body: JSON.stringify(formDataObject),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Search results:', data);
            setServerData(data); // Update the serverData state with search results
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      };
      
  
    return (
        <div>
          <div className='hero-container'>
            <h1 className="register-title">Search for Studies</h1>
            <form action="/participant-search" method="POST" onSubmit={handleSubmit}>
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
            <WidgetGrid serverData={serverData} selectedAge={selectedAge} selectedSex={selectedSex} />
          </div>
        </div>
      );
    }
  
  export default ParSearch;