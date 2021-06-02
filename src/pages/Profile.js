import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { FavoritesContext } from "../context/FavoritesContext";
import ProfileChannelCard from "../components/ProfileChannelCard";
import ProfileProgramCard from "../components/ProfileProgramCard";
import styles from "../styles/ProfileS.module.css";

const Profile = () => {
  const history = useHistory();
  const { loggedInUser, logOutUser, isLoggedIn } = useContext(UserContext);
  const {
    getAllFavorites,
    userFavorites,
    getAllProgramFavorites,
    userProgramFavorites,
  } = useContext(FavoritesContext);

  if (!isLoggedIn) {
    history.push("/");
  }
  useEffect(() => {
    console.log("Logged in user before stringify", loggedInUser);
    let idToSend = { userId: loggedInUser.id };
    getAllFavorites(idToSend);
    getAllProgramFavorites(idToSend);
  }, []);

  useEffect(() => {
    console.log("userFavorites in Profile", userFavorites);
  }, [userFavorites]);

  let favoritesChannelContent = <h3>Loading channels...</h3>;
  let favoritesProgramContent = <h3>Loading programs...</h3>;
  const renderChannelFavorites = () => {
    console.log("userFavorites in profile", userFavorites);
    console.log("userProgramFavorites", userProgramFavorites);
    return (
      <div>
        {userFavorites.channels.length < 1 && userFavorites.channels ? (
          <h3>Du har inga favoritkanaler än...</h3>
        ) : (
          userFavorites.channels.map((favorite, index) => {
            return <ProfileChannelCard channel={favorite} key={index} />;
          })
        )}
      </div>
    );
  };

  const renderProgramFavorites = () => {
    return (
      <div>
        {userProgramFavorites.programs.length < 1 ||
        userProgramFavorites.programs.length === undefined ? (
          <h3>Du har inga favoritprogram än...</h3>
        ) : (
          userProgramFavorites.programs.map((program, index) => {
            return <ProfileProgramCard program={program} key={index} />;
          })
        )}
      </div>
    );
  };
  if (userFavorites.channels) {
    favoritesChannelContent = renderChannelFavorites();
  } else {
    <h3>Cannot load channels</h3>;
  }

  if (userProgramFavorites.programs) {
    favoritesProgramContent = renderProgramFavorites();
  }
  return (
    <div className={styles.main_wrapper}>
      <h1>Välkommen, {loggedInUser.email}</h1>
      <h2>Favoritkanaler och Program</h2>
      <div className={styles.favorites_wrapper}>
        {" "}
        {favoritesChannelContent}
        {favoritesProgramContent}
      </div>
      <button className={styles.logout_button} onClick={logOutUser}>
        Logga ut
      </button>
    </div>
  );
};

export default Profile;
