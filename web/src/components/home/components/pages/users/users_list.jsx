import React, { useState, useEffect } from "react";
import classes from "./users.module.css";
import UserItem from "./user_item";
import { getDeviceUsers } from '../../../../../utils/functions';

function UsersList() {
  const [deviceUsers, setDeviceUsers] = useState([]);

  useEffect(() => {
    getDeviceUsers().then((users) => {
      setDeviceUsers(users);
    });
  }, []);

  return (
    <div className={classes.container}>
      {deviceUsers &&
        deviceUsers.map((usr, index) => {
          return (<UserItem key={index} username={usr.username} id={index} />);
        })}
    </div>
  );
}

export default UsersList;
