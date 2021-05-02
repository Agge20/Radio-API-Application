import React, { useEffect, useContext } from "react";
import { ChannelsContext } from "../context/ChannelsContext.js";
import styles from "../styles/ChannelS.module.css";
import ChannelSchedule from "../components/ChannelSchedule.js";

const Channel = (props) => {
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
        <img
          src={specificChannel.channel.image}
          alt={specificChannel.channel.name}
        />
        <div className={styles.a_wrapper}>
          <a href={specificChannel.channel.liveaudio.url}>Lyssna live</a>
          <a href={specificChannel.channel.siteurl}>Vår hemsida</a>
        </div>
        <p className={styles.tagline}>{specificChannel.channel.tagline}</p>
      </div>
    );
  };
  const renderPrograms = () => {
    console.log("This is channelPrograms, ", channelPrograms);
    console.log(channelPrograms.programs);
    return (
      <div>
        <h3 className={styles.h3}>Kanalens program</h3>
        <div className={styles.programs_wrapper}>
          {channelPrograms.programs.map((program, index) => (
            <div key={index} className={styles.program_card}>
              <div
                className={`${styles.program_image_wrapper} ${styles.program_card_inner_wrapper}`}
              >
                <img src={program.programimage} alt={program.name} />
              </div>
              <div
                className={`${styles.program_card_inner_wrapper} ${styles.program_info_wrapper}`}
              >
                <h4>{program.name}</h4>
                <p>{program.description}</p>
                <a href={program.programurl}>Gå till programmet</a>
                <h3>Sänds {program.broadcastinfo}</h3>
              </div>
            </div>
          ))}
        </div>
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

      <ChannelSchedule channelId={channelId} />
    </div>
  );
};

export default Channel;
