import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import styles from "../styles/ProfileS.module.css";

const Profile = () => {
  const history = useHistory();
  const { loggedInUser, logOutUser, isLoggedIn } = useContext(UserContext);

  if (!isLoggedIn) {
    history.push("/");
  }

  return (
    <div className={styles.main_wrapper}>
      <h1>Välkommen, {loggedInUser.email}</h1>
      <h2>Favoritkanaler</h2>
      <button onClick={logOutUser}>Logga ut</button>
    </div>
  );
};

export default Profile;
