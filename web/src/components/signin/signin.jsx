import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./signin.module.css";

import FormContainer from "../global_components/form_container/form_container";
import SignInForm from "./components/signin_form";
import Footer from "./components/footer";
import { logAppUser } from "../../utils/functions";

function SignIn() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const signInHandler = () => {
    const req = {
      "username": emailRef.current.value,
      "password": passwordRef.current.value
    }

    logAppUser(req).then((res) => {
      if (res['status'] === 200) {
        localStorage.setItem('username', req['username']);
        navigate("/home");
      } else {
        alert("Credenciales incorrectas");
      }
    })
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
