import { Link } from "react-router-dom";

import classes from "./footer.module.css";

function Footer() {
  return (
    <div className={classes.container}>
      <p>Aun no tienes una cuenta?</p>
      <p>
        <Link to="/signup" className={classes.link}>
          Crea una aquí
        </Link>
      </p>
    </div>
  );
}

export default Footer;
