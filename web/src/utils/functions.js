import axios from 'axios';

export const registerAppUser = (app_user) => {
    console.log(app_user);
    return axios.post(`${process.env.REACT_APP_API}app-user`, app_user, {
        Headers: {'Content-Type':'application/json'}
    }).then((res)=>{
        return res;
    }).catch(error => {
        return error.response;
    });
};

export const getAppUser = (username) => {
    console.log(username);
    return axios.get(`${process.env.REACT_APP_API}app-user/${username}`, {
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
    return axios.put(`${process.env.REACT_APP_API}app-user/${username}`,app_user, {
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
    return axios.delete(`${process.env.REACT_APP_API}app-user/${username}`, {
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
    return axios.post(`${process.env.REACT_APP_API}app-user/login/`, app_user, {
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) =>{
        return res;
    }).catch(error => {
        return error.response;
    });
};

export const registerDeviceUser = (device_user) => {
    return axios.post(`${process.env.REACT_APP_API}device-user/`, device_user, {
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
    return axios.put(`${process.env.REACT_APP_API}device-user/`, device_user, {
        headers: {
            "Content-Type": "application/json",
          }
    }).then((res) => {
        return res;
    }).catch(error => {
        return error.response;
    });
};

export const deleteDeviceUser = (device_user) => {
    return axios.delete(`${process.env.REACT_APP_API}device-user`, device_user, {
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