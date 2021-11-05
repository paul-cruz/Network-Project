import { Link } from "react-router-dom";

import classes from "./footer.module.css";

function Footer() {
  return (
    <div className={classes.container}>
      <p>Ya tienes una cuenta?</p>
      <p>
        <Link to="/signin" className={classes.link}>
          Inicia sesión aquí
        </Link>
      </p>
    </div>
  );
}

export default Footer;
