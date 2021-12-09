import { useRef, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

import { getSNMPData, updateSNMPData, insertLog } from '../../../../../utils/functions';

function DeviceDataModal(props) {
  const [host, setHost] = useState('');  
  const [responsable, setResponsable] = useState('');  
  const [location, setLocation] = useState('');  
  const [contact, setContact] = useState('');  
  const hostRef = useRef();
  const responsableRef = useRef();
  const locationRef = useRef();
  const contactRef = useRef();

  useEffect(() => {
    if(props.show){
      console.log("calling snmp on " +props.ip);
      getSNMPData(props.ip).then(response => {
        response = response['msg'];
        setHost(response['1.3.6.1.2.1.1.5.0']);
        setResponsable(response['1.3.6.1.2.1.1.1.0']);
        setLocation(response['1.3.6.1.2.1.1.6.0']);
        setContact(response['1.3.6.1.2.1.1.4.0']);
      });
    }
  }, [props.show, props.ip]);

  const onCancel = () => {
    props.on_hide();
  };

  const saveData = () => {
    updateSNMPData(props.ip, hostRef.current.value, locationRef.current.value, contactRef.current.value).then((response) => {
      props.on_hide();
      insertLog(localStorage.getItem('username'), 'Actualizó los datos de el dispositivo '+ props.name + ' vía SNMP');
    });
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
              onChange={(v) => setHost(v.target.value)}
              placeholder="Host..."
              ref={hostRef}
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
              onChange={(v) => setLocation(v.target.value)}
              ref={locationRef}
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
              onChange={(v) => setContact(v.target.value)}
              ref={contactRef}
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
              onChange={(v) => setResponsable(v.target.value)}
              ref={responsableRef}
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