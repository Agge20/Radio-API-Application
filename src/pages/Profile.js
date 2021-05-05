import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { FavoritesContext } from "../context/FavoritesContext";
import styles from "../styles/ProfileS.module.css";

const Profile = () => {
  const history = useHistory();
  const { loggedInUser, logOutUser, isLoggedIn } = useContext(UserContext);
  const { getAllFavorites, userFavorites } = useContext(FavoritesContext);

  if (!isLoggedIn) {
    history.push("/");
  }
  useEffect(() => {
    let bodyToSend = { userId: loggedInUser.id };
    getAllFavorites(bodyToSend);
  }, []);

  return (
    <div className={styles.main_wrapper}>
      <h1>Välkommen, {loggedInUser.email}</h1>
      <h2>Favoritkanaler</h2>
      {/* {userFavorites.channels.map((favorite) => {
        <p>{favorite.channelName}</p>;
      })} */}
      <button onClick={logOutUser}>Logga ut</button>
    </div>
  );
};

export default Profile;
