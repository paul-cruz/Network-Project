import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";

import { actRSA, insertLog } from "../../../../utils/functions";

function DeviceItem(props) {
  const [isEnabledRSA, setIsEnabledRSA] = useState(false);
  const [isCallingAPI, setIsCallingAPI] = useState(false);

  const addRSA = () => {
    setIsCallingAPI(true);
    const configureRSA = {
      ip: props.ip,
      admin: "cisco",
      adminPass: "cisco",
    };
    
    actRSA(configureRSA).then(() => {
      setIsEnabledRSA(true);
      setIsCallingAPI(false);
      insertLog('Miguel', 'Activó RSA en el router: ' + props.name);
    });
  };

  return (
    <div>
      <Row className="m-3">
        <Col>
          <h5>{props.name}</h5>
        </Col>
        <Col onClick={addRSA}>
          {isEnabledRSA ? (
            isCallingAPI ? <p>...</p> : <AiOutlineLock size="1.5rem" color="#0F9D58" />
          ) : (
            isCallingAPI ? <p>...</p> : <AiOutlineUnlock size="1.5rem" color="#DB4437" />
          )}
        </Col>
      </Row>
      <Row>
        <p>ip: {props.ip}</p>
      </Row>
    </div>
  );
}

export default DeviceItem;
