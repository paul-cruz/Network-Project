import { useState, useRef, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {getTopology} from "./functions/functions";
import OSPFModal from "./modal/ospf_modal";

import {
  configureEIGRP,
  configureRIP,
  insertLog,
} from "../../../../../utils/functions";

function Topology() {
  const [isRunningCommand, setIsRunningCommand] = useState(false);
  const [updateTime, setUpdateTime] = useState(100);
  const [dataForGraph, setDataForGraph] = useState(null);
  const [showOSPFModal, setShowOSPFModal] = useState(false); 
  const protocolRef = useRef();

  useEffect(() => {
    let interval = 0;
    if(!isRunningCommand){
      getTopology().then((data) => {
        console.log(data);
        setDataForGraph(data);
        localStorage.setItem('routers', data['ips'].length);
      });
      interval = setInterval(() => {
        getTopology().then((data) => {
          console.log(data);
          setDataForGraph(data);
          localStorage.setItem('routers', data['ips'].length);
        });
      }, updateTime * 1000);
    }
    return () => clearInterval(interval);
  }, [updateTime, isRunningCommand]);

  const onChangeProtocol = () => {
    setIsRunningCommand(true);
    const protocol = protocolRef.current.value;
    if (protocol === "rip") {
      const configurationRIP = {
        ip: "192.168.10.254",
        admin: "cisco",
        adminPass: "cisco",
      };

      configureRIP(configurationRIP).then(() => {
        setIsRunningCommand(false);
        alert('Se ah terminado de cambiar el método de enrutamiento');
        insertLog(localStorage.getItem('username'), 'Ah cambiado el protocolo de enrutamiento por RIP');
      });
    } else if (protocol === "ospf") {
      setShowOSPFModal(true);
    } else {
      const configurationEIGRP = {
        ip: "192.168.10.254",
        admin: "cisco",
        adminPass: "cisco",
      };

      configureEIGRP(configurationEIGRP).then(() => {
        setIsRunningCommand(false);
        alert('Se ah terminado de cambiar el método de enrutamiento');
        insertLog(localStorage.getItem('username'), 'Ah cambiado el protocolo de enrutamiento por EIGRP');
      });
    }
  };

  const onChangeUpdateTime = (e) => {
    const value = e.target.value;
    setUpdateTime(value);
  };

  return (
    <>
      <Container className="mt-3 mb-3">
        <Row>
          <Col className="col-md-3">
            <h3>Topología detectada</h3>
          </Col>
          <Col className="col-md-2">Actualización de toplogía (segundos)</Col>
          <Col className="col-md-2">
            <Form.Group className="mb-3 col-md-8 " controlId="formBasicEmail">
              <Form.Control
                type="number"
                placeholder="Segundos"
                value={updateTime}
                onChange={onChangeUpdateTime}
              />
            </Form.Group>
          </Col>
          <Col className="col-md-2">Tipo de enrutamiento: </Col>
          <Col className="col-md-1">
            <Form.Select aria-label="Default select example" ref={protocolRef}>
              <option value="rip">RIP</option>
              <option value="ospf">OSPF</option>
              <option value="eigrp">EIGRP</option>
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
        {dataForGraph === null ? <p>Loading...</p> : null}
      </Container>
      <OSPFModal show={showOSPFModal} on_hide={() => setShowOSPFModal(false)} set_is_running={setIsRunningCommand}/>
    </>
  );
}

export default Topology;
