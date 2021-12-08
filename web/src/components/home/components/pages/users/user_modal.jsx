import { useRef } from "react";
import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { updateDeviceUser, insertLog } from "../../../../../utils/functions";

function UserModal(props) {
  const ipRef = useRef();
  const currentRef = useRef();
  const passwordRef = useRef();

  const updatePassword = () => {
    const req = {
      "ip": ipRef.current.value,
      "username": props.username,
      "password": currentRef.current.value,
      "newPassword": passwordRef.current.value,
    };
    console.log(req);
    updateDeviceUser(req).then((res) => {
      console.log(res);
      alert('Se ha actualizado un usuario en todos los dispositivos');
      insertLog(localStorage.getItem('username'), 'Actualizó la contraseña de '+req['username'] +' en los dispositivos');
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
                type="password"
                placeholder="Introduce tu contraseña actual"
                ref={currentRef}
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
                placeholder="Introduce tu nueva contraseña"
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
          Actualizar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UserModal;
