import axios from "axios";

export async function getTopology() {
    const response = await axios.post(`${process.env.REACT_APP_API}topology/`, {
        'ip': '192.168.10.254',
        'name': 'R1',
        'admin': 'cisco',
        'adminPass': 'cisco',
      });
    return response.data;
}