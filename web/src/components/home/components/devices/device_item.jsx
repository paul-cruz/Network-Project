import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";

function DeviceItem(props) {
  return (
    <Row className="m-3">
      <Col>
        <h5>{props.name}</h5>
      </Col>
      <Col>
        {props.locked ? (
          <AiOutlineLock size="1.5rem" color="#0F9D58" />
        ) : (
          <AiOutlineUnlock size="1.5rem" color="#DB4437" />
        )}
      </Col>
    </Row>
  );
}

export default DeviceItem;
