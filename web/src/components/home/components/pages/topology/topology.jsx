import { useState, useRef } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Topology() {
  const [isRunningCommand, setIsRunningCommand] = useState(false);
  const protocolRef = useRef();

  const onChangeProtocol = () => {
    setIsRunningCommand(true);
    console.log(protocolRef.current.value);
  };

  return (
    <Container className="mt-3 mb-3">
      <Row>
        <Col className="col-md-6">
          <h3>Topología detectada</h3>
        </Col>
        <Col className="col-md-2">Tipo de enrutamiento: </Col>
        <Col className="col-md-2">
          <Form.Select aria-label="Default select example" ref={protocolRef}>
            <option value="RIP">RIP</option>
            <option value="OSPF">OSPF</option>
            <option value="EIGRP">EIGRP</option>
          </Form.Select>
        </Col>
        <Col className="col-md-2">
          <Button
            disabled={isRunningCommand}
            variant="success"
            onClick={onChangeProtocol}
          >
            Activar
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Topology;
