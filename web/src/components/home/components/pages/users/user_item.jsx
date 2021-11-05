import { useState } from "react";
import Row from "react-bootstrap/Row";

import classes from "./users.module.css";
import UserModal from "./user_modal";

function UserItem(props) {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");

  const showModal = (username) => {
    setSelectedUser(username);
    setShowUpdateModal(true);
  };

  return (
    <>
      <div className={classes.card}>
        <h5>{props.username}</h5>
        <Row className="d-flex justify-content-end">
          <button
            className={classes.button__update}
            onClick={() => showModal(props.username)}
          >
            Actualizar contraseña
          </button>
        </Row>
      </div>
      <UserModal
        username={selectedUser}
        show={showUpdateModal}
        on_hide={setShowUpdateModal.bind(false)}
      />
    </>
  );
}

export default UserItem;
