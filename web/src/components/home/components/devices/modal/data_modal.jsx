import { useRef, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

import { getSNMPData } from '../../../../../utils/functions';

function DeviceDataModal(props) {
  const [host, setHost] = useState('');  
  const [responsable, setResponsable] = useState('');  
  const [location, setLocation] = useState('');  
  const [contact, setContact] = useState('');  

  useEffect(() => {
    getSNMPData().then(response => {
      console.log(response);
      response = response['msg'];
      console.log(response['1.3.6.1.2.1.1.5.0']);
      setHost(response['1.3.6.1.2.1.1.5.0']);
      setResponsable(response['1.3.6.1.2.1.1.1.0']);
      setLocation(response['1.3.6.1.2.1.1.6.0']);
      setContact(response['1.3.6.1.2.1.1.4.0']);
    });
  }, [props.show]);

  const onCancel = () => {
    props.on_hide();
  };

  const saveData = () => {

  };

    return <Modal show={props.show} size="md" onHide={props.on_hide}>
    <Modal.Header closeButton>
      <Modal.Title>{props.username}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Row className="d-flex justify-content-center">
          <Form.Group
            className="mb-3 col-md-8 "
            controlId="formIp"
          >
            <Form.Control
              type="text"
              value={host}
              placeholder="Host..."
            />
          </Form.Group>
        </Row>
        <Row className="d-flex justify-content-center">
          <Form.Group
            className="mb-3 col-md-8 "
            controlId="formBasicPassword"
          >
            <Form.Control
              type="text"
              value={location}
              placeholder="Location..."
            />
          </Form.Group>
        </Row>
        <Row className="d-flex justify-content-center">
          <Form.Group
            className="mb-3 col-md-8"
            controlId="formBasicNewPassword"
          >
            <Form.Control
              type="text"
              value={contact}
              placeholder="Contact..."
            />
          </Form.Group>
        </Row>
        <Row className="d-flex justify-content-center">
          <Form.Group
            className="mb-3 col-md-8"
            controlId="formBasicNewPassword"
          >
            <Form.Control
              type="text"
              value={responsable}
              placeholder="Responsable..."
            />
          </Form.Group>
        </Row>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onCancel}>
        Cancelar
      </Button>
      <Button variant="primary" onClick={saveData}>
        Guardar
      </Button>
    </Modal.Footer>
  </Modal>
}

export default DeviceDataModal;