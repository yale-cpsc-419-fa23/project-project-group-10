import React, { useState } from 'react';
import { Modal, Button, Card, Row, Col } from 'react-bootstrap';

// Component for each grid item (widget)
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

// Usage
const Test = () => {
  // Simulated server data
  const serverData = [
    { id: 1, title: 'Item 1', description: 'Description 1', details: 'Details 1' },
    { id: 2, title: 'Item 2', description: 'Description 2', details: 'Details 2' },
    // Add more items as needed
  ];

  return <WidgetGrid serverData={serverData} />;
};

export default Test;
