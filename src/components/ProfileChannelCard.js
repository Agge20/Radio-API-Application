import React from "react";
import { useHistory } from "react-router";
import styles from "../styles/ProfileChannelCard.module.css";

const ProfileChannelCard = (props) => {
  const history = useHistory();
  const goToChannel = () => {
    history.push(`/channel/${props.channel.channelId}`);
  };

  return (
    <div className={styles.card_wrapper}>
      <h4>{props.channel.channelName}</h4>
      <button onClick={goToChannel}>Go to channel</button>
    </div>
  );
};

export default ProfileChannelCard;
