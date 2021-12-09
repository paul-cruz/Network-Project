import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";

import { getLogs } from '../../../../../utils/functions';
import classes from "./logs.module.css";

function Logs(props) {
  const [logs, setLogs] = useState();

  useEffect(() => {
    getLogs().then(response => setLogs(response));

    const id = setInterval(() => {
      getLogs().then(response => setLogs(response));
    }, 20000);

    return () => {
      clearInterval(id);
    }
  }, [props.pageIndex]);

  const buildRegister = (log) => {
    const nameSpaces = " ".repeat(10 - log.user.length);
    const dateSpaces = " ".repeat(1);
    const actionSpaces = " ".repeat(70 - log.action.length);
    return `> ${log.user}${nameSpaces} | ${log.date}${dateSpaces} | ${log.action}${actionSpaces}`;
  };

  if (!logs) {
    return <p>Loading...</p>;
  }

  return (
    <div className={classes.container}>
      {logs.length > 0 && logs.map((log, index) => {
        return (
          <div key={'1223' + index}>
            <span key={'12' + index}>
              <pre className={classes.line} key={index}>{buildRegister(log)}</pre>
            </span>
            <br />
          </div>
        );
      })}
    </div>
  );
}

export default Logs;
