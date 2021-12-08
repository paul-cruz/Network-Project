import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

import classes from "./navbar.module.css";
import DevicesList from "./devices/devices_list";
import { getTopology } from "../../../utils/functions";

function NavBar(props) {
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [devices, setDevices] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    if(showSideMenu) {
      getTopology('NewHost').then(res => {
        console.log(res);
        setDevices(res);
      })
    }
  }, [showSideMenu]);

  const setPageIndex = (index) => {
    props.set_page(index);
  };

  const signout = () => {
    navigate("/signin");
  };

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand>Los yepas</Navbar.Brand>
          <Nav className="me-auto">
            <div onClick={() => setPageIndex(0)}>
              <Nav.Link href="#home">Inicio</Nav.Link>
            </div>
            <div onClick={() => setPageIndex(1)}>
              <Nav.Link href="#usuarios">Usuarios</Nav.Link>
            </div>
            <div onClick={() => setPageIndex(2)}>
              <Nav.Link href="#logs">Logs</Nav.Link>
            </div>
            <div onClick={() => setPageIndex(3)}>
              <Nav.Link href="#graphs">Gráficas</Nav.Link>
            </div>
          </Nav>
          <div>
            <Button
              className={classes.button__devices}
              onClick={setShowSideMenu.bind(true)}
            >
              Ver dispositivos
            </Button>
            <Button
              className={classes.button__signout}
              variant="outline-error"
              onClick={signout}
            >
              Cerrar sesión
            </Button>
          </div>
        </Container>
      </Navbar>
      <Offcanvas show={showSideMenu} onHide={setShowSideMenu.bind(false)}>        
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Dispositivos</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        {devices.ips !== undefined ? <DevicesList ips={devices.ips} names={devices.names}/> : <p>Loading...</p>}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default NavBar;
