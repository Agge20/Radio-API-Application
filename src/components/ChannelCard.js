import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { ChannelsContext } from "../context/ChannelsContext";

import styles from "../styles/ChannelCardS.module.css";

const ChannelCard = (props) => {
  const history = useHistory();

  //Function that handles what to do when you click on a channel
  const goToChannel = async (targetId) => {
    console.log("TARGET ID ", targetId);
    history.push(`/channel/${targetId}`);
  };

  return (
    <div
      className={styles.channel_card}
      onClick={() => goToChannel(props.channel.id)}
    >
      <img src={props.channel.image} alt={props.channel.name} />
      <div className={styles.info_wrapper}>
        <h2 className={styles.h3}>{props.channel.name}</h2>
        <h4>Kanaltyp: {props.channel.channeltype}</h4>
        <p>{props.channel.tagline}</p>
      </div>
    </div>
  );
};

export default ChannelCard;
