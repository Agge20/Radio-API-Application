import { useEffect, useContext } from "react";
import { ChannelsContext } from "../context/ChannelsContext";
import ChannelCard from "../components/ChannelCard";
import styles from "../styles/ChannelCardS.module.css";

const Channels = () => {
  const { channels } = useContext(ChannelsContext);

  useEffect(() => {
    console.log("THIS is channels", channels);
  }, [channels]);

  //Function that returns all channels
  const renderChannels = () => {
    return channels.map((channel, index) => (
      <ChannelCard key={index} channel={channel} />
    ));
  };

  let content = <h3>Loading...</h3>;
  if (channels) {
    content = renderChannels();
  } else {
    content = <h3>Cannot load channels...</h3>;
  }

  return (
    <div>
      <h1>Här har vi kanalerna</h1>
      <div className={styles.channel_card_wrapper}>{content}</div>
    </div>
  );
};

export default Channels;
