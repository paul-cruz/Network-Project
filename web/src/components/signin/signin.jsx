import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./signin.module.css";

import FormContainer from "../global_components/form_container/form_container";
import SignInForm from "./components/signin_form";
import Footer from "./components/footer";

function SignIn() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const signInHandler = () => {
    //TODO: Call the API
    console.log(emailRef.current.value);
    console.log(passwordRef.current.value);

    //TODO: check if response was succesful
    navigate("/signup");
  };

  return (
    <div className={classes.background}>
      <FormContainer
        title="Inicia sesión"
        button_text="Accede al sistema"
        subtitle="Para acceder al sistema debes ingresar con tu cuenta"
        footer={<Footer />}
        form={<SignInForm email_ref={emailRef} password_ref={passwordRef} />}
        on_submit={signInHandler}
      />
    </div>
  );
}

export default SignIn;
