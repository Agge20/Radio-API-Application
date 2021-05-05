import React, { useContext } from "react";
import { useHistory } from "react-router";
import styles from "../styles/ProfileChannelCard.module.css";
import { FavoritesContext } from "../context/FavoritesContext";
import { UserContext } from "../context/UserContext";
import useForceUpdate from "use-force-update";

const ProfileChannelCard = (props) => {
  const history = useHistory();
  const { deleteFavorite } = useContext(FavoritesContext);
  const { loggedInUser } = useContext(UserContext);
  const forceUpdate = useForceUpdate();

  const goToChannel = () => {
    history.push(`/channel/${props.channel.channelId}`);
  };
  //Delete favorite channel
  const deleteFavoriteFunc = () => {
    console.log(
      "loggedInUser-id",
      loggedInUser.id,
      "channelId",
      props.channel.channelId
    );
    deleteFavorite(loggedInUser.id, props.channel.channelId);
    alert(`Channel ${props.channel.channelName} deleted`);
    forceUpdate();
  };

  return (
    <div className={styles.card_wrapper}>
      <h4>{props.channel.channelName}</h4>
      <button onClick={goToChannel}>Gå till kanal</button>
      <button className={styles.remove_button} onClick={deleteFavoriteFunc}>
        X
      </button>
    </div>
  );
};

export default ProfileChannelCard;
