import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";

function ProjectToast(props) {
  return (
    <ToastContainer position={"top-end"}>
      <Toast
        show={props.show}
        onClose={props.onClose}
        bg={props.variant}
        autohide
        delay={props.delay}
      >
        <Toast.Header>
          <strong className="me-auto">{props.title}</strong>
          <small>Pedro</small>
        </Toast.Header>
        <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ProjectToast;
