import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";

import classes from "./logs.module.css";

function Logs() {
  const [logs, setLogs] = useState();

  useEffect(() => {
    //TODO: Call the API
    setLogs([
      {
        user: "Pedro",
        date: "09/11/2021 10:23:10",
        action: "Activó el procolo RIP en la topología",
      },
      {
        user: "Alexisssss",
        date: "09/12/2021 12:23:10",
        action: "Activó RSA y SSH en el dispositivo 1",
      },
      {
        user: "Ajua",
        date: "09/12/2021 12:23:10",
        action: "Activó RSA y SSH en el dispositivo 1",
      },
      {
        user: "Alexis",
        date: "09/12/2021 12:23:10",
        action: "Activó RSA y SSH en el dispositivo 1",
      },
      {
        user: "Alexis",
        date: "09/12/2021 12:23:10",
        action: "Activó RSA y SSH en el dispositivo 1",
      },
      {
        user: "Alexis",
        date: "09/12/2021 12:23:10",
        action: "Activó RSA y SSH en el dispositivo 1",
      },
      {
        user: "Alexis",
        date: "09/12/2021 12:23:10",
        action: "Activó RSA y SSH en el dispositivo 1",
      },
      {
        user: "Alexis",
        date: "09/12/2021 12:23:10",
        action: "Activó RSA y SSH en el dispositivo 1",
      },
      {
        user: "Alexis",
        date: "09/12/2021 12:23:10",
        action: "Activó RSA y SSH en el dispositivo 1",
      },
      {
        user: "Alexis",
        date: "09/12/2021 12:23:10",
        action: "Activó RSA y SSH en el dispositivo 1",
      },
      {
        user: "Alexis",
        date: "09/12/2021 12:23:10",
        action: "Activó RSA y SSH en el dispositivo 1",
      },
      {
        user: "Alexis",
        date: "09/12/2021 12:23:10",
        action: "Activó RSA y SSH en el dispositivo 1",
      },
      {
        user: "Alexis",
        date: "09/12/2021 12:23:10",
        action: "Activó RSA y SSH en el dispositivo 1",
      },
    ]);
  }, []);

  const buildRegister = (log) => {
    const nameSpaces = " ".repeat(15 - log.user.length);
    const dateSpaces = " ".repeat(5);
    const actionSpaces = " ".repeat(40 - log.action.length);
    return `> ${log.user}${nameSpaces} | ${log.date}${dateSpaces} | ${log.action}${actionSpaces}`;
  };

  if (!logs) {
    return <Spinner />;
  }

  /*
  <ProjectToast
        show={show}
        onClose={() => setShow(false)}
        title="Actualización"
        variant="primary"
        delay={1000}
      />
  */
  return (
    <div className={classes.container}>
      {logs.map((log) => {
        return (
          <>
            <span>
              <pre className={classes.line}>{buildRegister(log)}</pre>
            </span>
            <br />
          </>
        );
      })}
    </div>
  );
}

export default Logs;
