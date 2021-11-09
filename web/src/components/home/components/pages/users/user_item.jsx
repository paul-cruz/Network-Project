import { useState } from "react";
import classes from "./users.module.css";
import UserModal from "./user_modal";
import DeleteUserModal from "./delete_user_modal";


function UserItem(props) {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");

  const showModal = (username) => {
    setSelectedUser(username);
    setShowUpdateModal(true);
  };

  const showDeleteModalF = (username) => {
    setSelectedUser(username);
    setShowDeleteModal(true);
  };

  return (
    <>
      <div className={classes.card}>
        <h5>{props.username} </h5>
        <button
          className={classes.button__delete}
          onClick={() => showDeleteModalF(props.username)}
        >
          Eliminar
        </button>
        <button
          className={classes.button__update}
          onClick={() => showModal(props.username)}
        >
          Actualizar contraseña
        </button>
      </div>
      <UserModal
        username={selectedUser}
        show={showUpdateModal}
        on_hide={setShowUpdateModal.bind(false)}
      />

      <DeleteUserModal
        username={selectedUser}
        show={showDeleteModal}
        on_hide={setShowDeleteModal.bind(false)}
      />
    </>
  );
}

export default UserItem;
