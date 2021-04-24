import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { ChannelsContext } from "../context/ChannelsContext.js";
import styles from "../styles/ChannelS.module.css";

const Channel = (props) => {
  const history = useHistory();
  const {
    getChannelById,
    getProgramById,
    specificChannel,
    channelPrograms,
  } = useContext(ChannelsContext);

  //Get the id-params and store it in a variable
  const { channelId } = props.match.params;

  //On render it fetches the specific channel based on id
  useEffect(() => {
    console.log("This is channelId id in Channel:  ", channelId);
    console.log("this is specificChannel: ", specificChannel);
    getChannelById(channelId);
    getProgramById(channelId);
  }, []);
  let channelContent = <h3>Loading...</h3>;
  let programsContent = <h3>Loading... programs</h3>;
  //Function that renders the channel
  const renderChannel = () => {
    return (
      <div className={styles.channelContent_wrapper}>
        <h1>Välkommen till {specificChannel.channel.name}</h1>
        <img src={specificChannel.channel.image} />
        <a href={specificChannel.channel.liveaudio.url}>Lyssna på livemusik</a>
        <a href={specificChannel.channel.siteurl}>Vår hemsida</a>
        <p>{specificChannel.channel.tagline}</p>
      </div>
    );
  };
  const renderPrograms = () => {
    console.log("This is channelPrograms, ", channelPrograms);
    console.log(channelPrograms.programs);
    return (
      <div>
        <h3>Kanalens program</h3>
        {channelPrograms.programs.map((program, index) => (
          <div>
            <div className={styles.program_image_wrapper}>
              <img src={program.programimage} alt={program.name} />
            </div>
            <h4>{program.name}</h4>
            <p>{program.description}</p>
            <a href={program.programurl}>Gå till programmet</a>
            <h3>Sänds {program.broadcastinfo}</h3>
          </div>
        ))}
      </div>
    );
  };

  //Checks if the clicked channel is loaded and sets the content to the renderChannel func
  if (specificChannel && renderChannel) {
    channelContent = renderChannel();
  } else {
    channelContent = <h3>Cannot load channel...</h3>;
  }

  if (channelPrograms) {
    programsContent = renderPrograms();
  } else {
    channelContent = <h3>Cannot load programs...</h3>;
  }
  return (
    <div className={styles.main_wrapper}>
      {channelContent}
      {programsContent}
    </div>
  );
};

export default Channel;
