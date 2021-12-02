import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import FormContainer from "../global_components/form_container/form_container";
import classes from "./signup.module.css";
import SignUpForm from "./components/signup_form";
import Footer from "./components/footer";
import { registerAppUser } from "../../utils/functions";

function SignUp() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const signUpHandler = () => {
    const req = {
      "email": emailRef.current.value,
      "username": nameRef.current.value,
      "password": passwordRef.current.value
    }

    registerAppUser(req).then((res) => {
      console.log(res);
      if (res["msg"] === "Inserted") {
        navigate("/signin");
      } else {
        console.log(res);
        alert("Hubo un error");
      }
    })
  };

  return (
    <div className={classes.background}>
      <FormContainer
        title="Registrate para entrar"
        subtitle="Requieres de una cuenta para poder ingresar"
        button_text="¡Registrate!"
        form={
          <SignUpForm
            name_ref={nameRef}
            email_ref={emailRef}
            password_ref={passwordRef}
          />
        }
        footer={<Footer />}
        on_submit={signUpHandler}
      />
    </div>
  );
}

export default SignUp;
