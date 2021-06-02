import React, { useContext } from "react";
import { useHistory } from "react-router";
import styles from "../styles/ProfileChannelCard.module.css";
import { FavoritesContext } from "../context/FavoritesContext";
import { UserContext } from "../context/UserContext";
import useForceUpdate from "use-force-update";

const ProfileProgramCard = (props) => {
  const history = useHistory();
  const { deleteFavoriteProgram } = useContext(FavoritesContext);
  const { loggedInUser } = useContext(UserContext);
  const forceUpdate = useForceUpdate();

  //Delete favorite channel
  const deleteFavoriteFunc = () => {
    console.log(
      "loggedInUser-id",
      loggedInUser.id,
      "programId",
      props.program.programId
    );
    deleteFavoriteProgram(loggedInUser.id, props.program.programId);
    alert(`Kanal ${props.program.programName} borttaget från favoriter`);
    history.push("/");
    forceUpdate();
  };

  return (
    <div className={styles.card_wrapper}>
      <h4>{props.program.programName}</h4>
      <button className={styles.a}>
        <a href={props.program.programUrl} className={styles.a}>
          Gå till program
        </a>
      </button>
      <button className={styles.remove_button} onClick={deleteFavoriteFunc}>
        X
      </button>
    </div>
  );
};

export default ProfileProgramCard;
