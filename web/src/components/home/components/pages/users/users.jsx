import React, { useState } from "react";
import UsersList from "./users_list";
import AddUserModal from './add_user_modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/Container";

function Users() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <Container className="mt-3 mb-3">
      <Row>
        <Button variant="success" onClick={setShowAddModal.bind(true)}>Agregar usuario</Button>
      </Row>
      <UsersList />
      <AddUserModal
        show={showAddModal}
        on_hide={setShowAddModal.bind(false)}
      />
    </Container>
  );
}

export default Users;
