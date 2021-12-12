import {useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Listener from './listener';

function Packages(props) {
    const [listeners, setListeners] = useState([<Listener key={'index0'}/>]);

    const addListener = () => {
        setListeners((listenersState) => [...listenersState, <Listener key={'index'+listenersState.length}/>]);
    }

    return(
        <div>
            <Row className="d-flex justify-content-around mb-3 mt-2">
                <Col className="col-md-7">
                <h2>Monitoreo de paquetes</h2>
                </Col>
                <Col className="col-md-3 mt-2">
                <Button onClick={addListener} variant="success">Añadir escucha</Button>
                </Col>
            </Row>
            {
                listeners.map((listener, index) => <div key={'keyc'+index}><hr/>{listener} </div>)
            }
        </div>
    );
}

export default Packages;