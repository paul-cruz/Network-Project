import { useState, useRef, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { getTopology } from "./functions/functions";
import TopologyGraph from '../../../../topology_graph';

import {
  configureEIGRP,
  configureOSPF,
  configureRIP,
} from "../../../../../utils/functions";

function Topology() {
  const [isRunningCommand, setIsRunningCommand] = useState(false);
  const [updateTime, setUpdateTime] = useState(10);
  const [dataForGraph, setDataForGraph] = useState(null);
  const [graphNodes, setGraphNodes] = useState([]);
  const [graphEdges, setGraphEdges] = useState([]);
  const protocolRef = useRef();

  const drawTopologyGraph = () => {
    if (!dataForGraph) {
      return;
    }
    let nodes = [];
    let edgesAux = {};
    let edges = [];

    Object.keys(dataForGraph).forEach((node, index) => {
      nodes.push({ id: index, label: node });
      edgesAux[node] = index;
    })

    Object.entries(dataForGraph).forEach(([node, neighbors]) => {
      neighbors.forEach(neighbor => {
        edges.push({ from: edgesAux[node], to: edgesAux[neighbor] })
      })
    })
    setGraphNodes(nodes);
    setGraphEdges(edges);
  }

  useEffect(() => {
    getTopology().then((data) => {
      console.log(data);
      setDataForGraph(data);
    });
    const interval = setInterval(() => {
      getTopology().then((data) => {
        console.log(data);
        setDataForGraph(data);
        drawTopologyGraph();
      });
    }, updateTime * 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateTime]);

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
      });
    } else if (protocol === "ospf") {
      const configurationOSPF = {
        ip: "192.168.10.254",
        admin: "cisco",
        adminPass: "cisco",
        wildcard: "0.0.0.255",
        area: "0",
      };

      configureOSPF(configurationOSPF).then(() => {
        setIsRunningCommand(false);
      });
    } else {
      const configurationEIGRP = {
        ip: "192.168.10.254",
        admin: "cisco",
        adminPass: "cisco",
      };

      configureEIGRP(configurationEIGRP).then(() => {
        setIsRunningCommand(false);
      });
    }
  };

  const onChangeUpdateTime = (e) => {
    const value = e.target.value;
    setUpdateTime(value);
  };

  return (
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
      {dataForGraph === null ? <p>Loading...</p> : <TopologyGraph nodes={graphNodes} edges={graphEdges} />}
    </Container>
  );
}

export default Topology;
