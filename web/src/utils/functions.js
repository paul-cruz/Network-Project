import axios from 'axios';

export const registerAppUser = (app_user) => {
    return axios.post(`${process.env.REACT_APP_API}appuser/`, app_user, {
        Headers: { 'Content-Type': 'application/json' }
    }).then((res) => {
        console.log(res);
        return res;
    }).catch(error => {
        return error.response;
    });
};

export const getAppUser = (username) => {
    console.log(username);
    return axios.get(`${process.env.REACT_APP_API}appuser/${username}`, {
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => {
        return res.data;
    }).catch(error => {
        return error.response;
    });
};

export const updateAppUser = (app_user, username) => {
    return axios.put(`${process.env.REACT_APP_API}appuser/${username}`, app_user, {
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => {
        return res;
    }).catch(error => {
        return error.response;
    });
};

export const deleteAppUser = (username) => {
    return axios.delete(`${process.env.REACT_APP_API}appuser/${username}`, {
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => {
        return res;
    }).catch(error => {
        return error.response;
    });
};

export const logAppUser = (app_user) => {
    return axios.post(`${process.env.REACT_APP_API}appuser/login/`, app_user, {
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => {
        return res;
    }).catch(error => {
        return error.response;
    });
};

export const registerDeviceUser = (device_user) => {
    return axios.post(`${process.env.REACT_APP_API}deviceUser/`, device_user, {
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => {
        return res;
    }).catch(error => {
        return error.response;
    });
};

export const updateDeviceUser = (device_user) => {
    return axios.put(`${process.env.REACT_APP_API}deviceUser/`, device_user, {
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => {
        return res;
    }).catch(error => {
        return error.response;
    });
};

export const deleteDeviceUser = (data) => {
    return axios.post(`${process.env.REACT_APP_API}deviceUser/delete/`, data, {
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => {
        return res;
    }).catch(error => {
        return error.response;
    });
};

export const configureRIP = (rip_protocol) => {
    return axios.post(`${process.env.REACT_APP_API}protocols/rip`, rip_protocol, {
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => {
        return res;
    }).catch(error => {
        return error.response;
    });
};

export const configureOSPF = (ospf_protocol) => {
    return axios.post(`${process.env.REACT_APP_API}protocols/ospf`, ospf_protocol, {
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => {
        return res;
    }).catch(error => {
        return error.response;
    });
};


export const configureEIGRP = (eigrp_protocol) => {
    return axios.post(`${process.env.REACT_APP_API}protocols/eigrp`, eigrp_protocol, {
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => {
        return res;
    }).catch(error => {
        return error.response;
    });
};

export const actRSA = (rsa_connection) => {
    return axios.post(`${process.env.REACT_APP_API}RSA/activate`, rsa_connection, {
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => {
        return res;
    }).catch(error => {
        return error.response;
    });
};


export const getDeviceUsers = (username) => {
    console.log(username);
    return axios.get(`${process.env.REACT_APP_API}deviceUser/`, {
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => {
        return res.data;
    }).catch(error => {
        return error.response;
    });
};

export async function getTopology(routerName = "R1") {
    const response = await axios.post(`${process.env.REACT_APP_API}topology/`, {
        'ip': '192.168.10.254',
        'name': routerName,
        'admin': 'cisco',
        'adminPass': 'cisco',
      });
    return response.data;
}

export async function insertLog(userName, action) {
    const response = await axios.post(`${process.env.REACT_APP_API}logs/`, {
        'user': userName,
        'action': action,
      });
    return response.data;
}

export async function getLogs() {
    const response = await axios.get(`${process.env.REACT_APP_API}logs/`);
    return response.data;
}

export async function getSNMPData(ip) {
    const response = await axios.post(`${process.env.REACT_APP_API}SNMP/`, {
        ip: ip,
    });
    return response.data;
}

export async function updateSNMPData(ip, host, location, contact) {
    const response = await axios.put(`${process.env.REACT_APP_API}SNMP/`, {
        ip,
        host,
        location, 
        contact,
    });
    return response.data;
}


export async function getInterfaceCounters(ip, ip2, interface1, interface2) {
    const response = await axios.post(`${process.env.REACT_APP_API}packages/`, {
        ip,
        ip2,
        'interface': interface1, 
        interface2,
        'admin': 'cisco',
        'adminPass': 'cisco',
    });
    return response.data;
}