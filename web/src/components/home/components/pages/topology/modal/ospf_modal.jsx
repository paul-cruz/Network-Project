import { useRef } from "react";
import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

import { configureOSPF, insertLog } from "../../../../../../utils/functions";

function OSPFModal(props) {
  const ipRef = useRef();
  const wildcardRef = useRef();
  const areaRef = useRef();

  const onCancel = () => {
    props.on_hide();
  };

  const saveData = () => {
    const configurationOSPF = {
      ip: ipRef.current.value,
      admin: "cisco",
      adminPass: "cisco",
      wildcard: wildcardRef.current.value,
      area: areaRef.current.value,
    };
    props.on_hide();

    configureOSPF(configurationOSPF).then(() => {
      props.set_is_running(false);
      alert('Se ah terminado de cambiar el método de enrutamiento');
      insertLog(localStorage.getItem('username'), 'Ah cambiado el protocolo de enrutamiento por OSPF');
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
              placeholder="Ip de dispositivo"
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
              placeholder="Wildcard..."
              ref={wildcardRef}
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
              placeholder="Area..."
              ref={areaRef}
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
        Activar
      </Button>
    </Modal.Footer>
  </Modal>
}

export default OSPFModal;