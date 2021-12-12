import Table from 'react-bootstrap/Table';

function DataTable(props) {
    return (
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
                    <td>{props['data1']['input1']}</td>
                    <td>{props['data1']['output1']}</td>
                    <td>{props['data1']['broken1']}</td>
                    <td>{props['data1']['lost1']}</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>{props['data2']['input2']}</td>
                    <td>{props['data2']['output2']}</td>
                    <td>{props['data2']['broken2']}</td>
                    <td>{props['data2']['lost2']}</td>
                </tr>
            </tbody>
        </Table>
    );
}

export default DataTable;