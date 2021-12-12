import {useRef, useState, useEffect} from 'react';

import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

import {getInterfaceCounters, insertLog} from '../../../../../utils/functions';

function Listener() {  
    const ip1 = useRef();
    const ip2 = useRef();
    const interface1 = useRef();
    const interface2 = useRef();
    const [updateTime, setUpdateTime] = useState(10);
    const [isListening, setIsListening] = useState(false);
    const [data1, setData1] = useState({
        'input1': '0',
        'output1': '0',
        'broken1': '0',
        'lost1': '0'
    });
    const [data2, setData2] = useState({
        'input2': '0',
        'output2': '0',
        'broken2': '0',
        'lost2': '0'
    });

    useEffect(() => {
        let interval = 0;
        if(isListening) {
            interval = setInterval(() => {
                getInterfaceCounters(ip1.current.value, ip2.current.value, interface1.current.value, interface2.current.value).then((response) => {
                    response = response['msg'];
                    setData1({
                        'input1': response['input1'],
                        'output1': response['output1'],
                        'broken1': response['broken1'],
                        'lost1': parseInt(response['lost1']) > 0 ? response['lost1'] : 0,
                    });
        
                    setData2({
                        'input2': response['input2'],
                        'output2': response['output2'],
                        'broken2': response['broken2'],
                        'lost2': parseInt(response['lost2']) > 0 ? response['lost2'] : 0,
                    });
                });
            }, updateTime * 1000);
        }

        return(()=>clearInterval(interval));
    }, [updateTime, isListening]);

    const listenData = () => {
        setIsListening(true);
        getInterfaceCounters(ip1.current.value, ip2.current.value, interface1.current.value, interface2.current.value).then((response) => {
            response = response['msg'];
            setData1({
                'input1': response['input1'],
                'output1': response['output1'],
                'broken1': response['broken1'],
                'lost1': parseInt(response['lost1']) > 0 ? response['lost1'] : 0,
            });

            setData2({
                'input2': response['input2'],
                'output2': response['output2'],
                'broken2': response['broken2'],
                'lost2': parseInt(response['lost2']) > 0 ? response['lost2'] : 0,
            });

            insertLog(localStorage.getItem('username'), 'Monitoreó las interfaces '+ ip1.current.value+'->'+interface1.current.value +' y ' + ip2.current.value+'->'+interface2.current.value );
        });
    };

    return (<Container>
        <Row className="d-flex justify-content-between">
            <Col className="col-md-5">
                <Form.Group className="mb-3 col-md-8 " controlId="formBasicEmail">
                <Form.Control
                    type="text"
                    placeholder="Ip de dispositivo 1"
                    ref={ip1}
                />
                </Form.Group>
            </Col>

            <Col className="col-md-5">
                <Form.Group className="mb-3 col-md-8 " controlId="formBasicEmail">
                <Form.Control
                    type="text"
                    placeholder="Ip de dispositivo 2"
                    ref={ip2}
                />
                </Form.Group>
            </Col>

            <Col className="col-md-2">
                <Form.Group className="mb-3 col-md-8 " controlId="formBasicEmail">
                <Form.Control
                    type="text"
                    placeholder="Tiempo de escaneo"
                    value={updateTime}
                    onChange={(e) => setUpdateTime(e.target.value)}
                />
                </Form.Group>
            </Col>
        </Row>
        <Row className="d-flex justify-content-around">
            <Col className="col-md-5">
                <Form.Group className="mb-3 col-md-8 " controlId="formBasicEmail">
                <Form.Control
                    type="text"
                    placeholder="Número de interfaz: Ex. 0/0"
                    ref={interface1}
                />
                </Form.Group>
            </Col>

            <Col className="col-md-5">
                <Form.Group className="mb-3 col-md-8 " controlId="formBasicEmail">
                <Form.Control
                    type="text"
                    placeholder="Número de interfaz: Ex. 0/0"
                    ref={interface2}
                />
                </Form.Group>
            </Col>

            <Col className="col-md-2">
                <Form.Group className="mb-3 col-md-8 " controlId="formBasicEmail">
                <Button variant="info" onClick = {listenData} disabled={isListening}>{isListening?'Monitoreando': 'Monitorear'}</Button>
                </Form.Group>
            </Col>
        </Row>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>No. Dispositivo</th>
                    <th>P. de entrada</th>
                    <th>P. de salida</th>
                    <th>P. dañados</th>
                    <th>P. perdidos</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>{data1['input1']} Paquetes</td>
                    <td>{data1['output1']} Paquetes</td>
                    <td>{data1['broken1']} Paquetes</td>
                    <td>{data1['lost1']} Paquetes</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>{data2['input2']} Paquetes</td>
                    <td>{data2['output2']} Paquetes</td>
                    <td>{data2['broken2']} Paquetes</td>
                    <td>{data2['lost2']} Paquetes</td>
                </tr>
            </tbody>
        </Table>
    </Container>);
}

export default Listener;