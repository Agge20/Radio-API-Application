import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { FavoritesContext } from "../context/FavoritesContext";
import ProfileChannelCard from "../components/ProfileChannelCard";
import styles from "../styles/ProfileS.module.css";

const Profile = () => {
  const history = useHistory();
  const { loggedInUser, logOutUser, isLoggedIn } = useContext(UserContext);
  const { getAllFavorites, userFavorites } = useContext(FavoritesContext);

  if (!isLoggedIn) {
    history.push("/");
  }
  useEffect(() => {
    console.log("Logged in user before stringify", loggedInUser);
    let idToSend = { userId: loggedInUser.id };
    getAllFavorites(idToSend);
  }, []);

  useEffect(() => {
    console.log("userFavorites in Profile", userFavorites);
  }, [userFavorites]);

  let favoritesContent = <h3>Loading...</h3>;
  const renderFavorites = () => {
    console.log("userFavorites in profile", userFavorites);
    return (
      <div className={styles.favorites_wrapper}>
        {userFavorites.channels.length < 1 && userFavorites.channels ? (
          <h3>Du har inga favoriter än...</h3>
        ) : (
          userFavorites.channels.map((favorite, index) => {
            return <ProfileChannelCard channel={favorite} />;
          })
        )}
      </div>
    );
  };

  if (userFavorites.channels) {
    favoritesContent = renderFavorites();
  } else {
    <h3>Cannot load channels</h3>;
  }
  return (
    <div className={styles.main_wrapper}>
      <h1>Välkommen, {loggedInUser.email}</h1>
      <h2>Favoritkanaler</h2>
      {favoritesContent}
      <button onClick={logOutUser}>Logga ut</button>
    </div>
  );
};

export default Profile;
