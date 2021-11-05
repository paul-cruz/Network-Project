import classes from "./form_container.module.css";

import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

function FormContainer(props) {
  return (
    <Container className={classes.container}>
      <Row>
        <h1 className={classes.title}>{props.title}</h1>
        <p className={classes.subtitle}>{props.subtitle}</p>
      </Row>
      <Row>{props.form}</Row>
      <Row className="d-flex align-items-center justify-content-center">
        <button className={classes.button} onClick={props.on_submit}>
          {props.button_text}
        </button>
      </Row>
      {props.footer}
    </Container>
  );
}

export default FormContainer;
