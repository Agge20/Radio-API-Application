import React from "react";
import styles from "../styles/RegisteredS.module.css";
import { useHistory } from "react-router-dom";

const LoggedIn = () => {
  const history = useHistory();
  const goToProfile = () => {
    history.push("/profile");
  };
  return (
    <div className={styles.main_wrapper}>
      <h1>Du är nu inloggad!</h1>
      <button onClick={goToProfile}>Till profil</button>
    </div>
  );
};

export default LoggedIn;
