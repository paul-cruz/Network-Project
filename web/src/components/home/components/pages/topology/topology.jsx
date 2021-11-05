import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

function Topology() {
  return (
    <Container className="mt-3 mb-3">
      <Row>
        <Col className="col-md-8">
          <h3>Topología detectada</h3>
        </Col>
        <Col className="col-md-2">Tipo de enrutamiento: </Col>
        <Col className="col-md-2">
          <Form.Select aria-label="Default select example">
            <option value="1">RIP</option>
            <option value="2">OSPF</option>
            <option value="3">EIGRP</option>
          </Form.Select>
        </Col>
      </Row>
    </Container>
  );
}

export default Topology;
