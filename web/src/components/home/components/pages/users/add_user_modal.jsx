import { useRef } from "react";
import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { registerDeviceUser, insertLog } from "../../../../../utils/functions";

function UserModal(props) {
  const ipRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const updatePassword = () => {
    const req = {
      "ip": ipRef.current.value,
      "admin": "cisco",
      "adminPass": "cisco",
      "username": usernameRef.current.value,
      "password": passwordRef.current.value,
    };
    registerDeviceUser(req).then((res) => {
      alert('Se ha añadido un usuario a todos los dispositivos');
      insertLog(localStorage.getItem('username'), 'Añadió a ' + req['username'] + ' a los dispositivos');
    });
    props.on_hide();
  };

  const onCancel = () => {
    props.on_hide();
  };

  return (
    <Modal show={props.show} size="md" onHide={props.on_hide}>
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
                placeholder="Introduce la ip del dispositivo"
                ref={ipRef}
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
                placeholder="Introduce tu username"
                ref={usernameRef}
              />
            </Form.Group>
          </Row>
          <Row className="d-flex justify-content-center">
            <Form.Group
              className="mb-3 col-md-8"
              controlId="formBasicNewPassword"
            >
              <Form.Control
                type="password"
                placeholder="Introduce tu contraseña"
                ref={passwordRef}
              />
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={updatePassword}>
          Añadir
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UserModal;
