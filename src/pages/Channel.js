import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { ChannelsContext } from "../context/ChannelsContext.js";
import styles from "../styles/ChannelS.module.css";

const Channel = (props) => {
  const history = useHistory();
  const { getChannelById, specificChannel } = useContext(ChannelsContext);
  //Get the id-params and store it in a variable
  const { channelId } = props.match.params;

  //On render it fetches the specific channel based on id
  useEffect(() => {
    console.log("props: ", props);
    console.log("This is channelId id in Channel:  ", channelId);
    getChannelById(channelId);
    console.log("this is specificChannel: ", specificChannel);
  }, []);
  let content = <h3>Loading...</h3>;
  //Function that renders the channel
  const renderChannel = () => {
    console.log("test", specificChannel);
    return (
      <div className={styles.content_wrapper}>
        <h1>Välkommen till {specificChannel.channel.name}</h1>
        <img src={specificChannel.channel.image} />
        <a href={specificChannel.channel.liveaudio.url}>Lyssna på livemusik</a>
        <a href={specificChannel.channel.siteurl}>Vår hemsida</a>
        <p>{specificChannel.channel.tagline}</p>
      </div>
    );
  };

  if (specificChannel && renderChannel) {
    content = renderChannel();
  } else {
    content = <h3>Cannot load channel...</h3>;
  }
  return <div className={styles.main_wrapper}>{content}</div>;
};

export default Channel;
