import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function SignUpForm(props) {
  return (
    <Form>
      <Row className="d-flex justify-content-center">
        <Form.Group className="mb-3 col-md-8 " controlId="formBasicName">
          <Form.Control
            type="text"
            placeholder="Introduce tu nombre"
            ref={props.name_ref}
          />
        </Form.Group>
      </Row>
      <Row className="d-flex justify-content-center">
        <Form.Group className="mb-3 col-md-8 " controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Introduce tu correo"
            ref={props.email_ref}
          />
        </Form.Group>
      </Row>
      <Row className="d-flex justify-content-center">
        <Form.Group className="mb-3 col-md-8" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Introduce tu contraseña"
            ref={props.password_ref}
          />
        </Form.Group>
      </Row>
    </Form>
  );
}

export default SignUpForm;
