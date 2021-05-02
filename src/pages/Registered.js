import React from "react";
import { useHistory } from "react-router-dom";
import styles from "../styles/RegisteredS.module.css";

const Registered = () => {
  const history = useHistory();
  const routeHome = () => {
    history.push("/");
  };
  return (
    <div className={styles.main_wrapper}>
      <h1>Du är nu registrerad!</h1>
      <h2>Tack!</h2>
      <button onClick={routeHome}>Tillbaka till hem</button>
    </div>
  );
};

export default Registered;
