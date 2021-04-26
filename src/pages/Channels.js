import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ChannelsContext } from "../context/ChannelsContext";
import ChannelCard from "../components/ChannelCard";
import styles from "../styles/ChannelCardS.module.css";

const Channels = () => {
  const { channels, categories } = useContext(ChannelsContext);

  useEffect(() => {
    console.log("THIS is channels", channels);
  }, [channels]);

  //Function that returns all channels
  const renderChannels = () => {
    return channels.map((channel, index) => (
      <ChannelCard key={index} channel={channel} />
    ));
  };

  //Function that returns all categories
  const renderCategories = () => {
    console.log("This is categories in channels: ", categories);
    return categories.programcategories.map((category, index) => (
      <Link key={index} to={`/kategori/${category.name}`}>
        {category.name}
      </Link>
    ));
  };

  let channelsContent = <h3>Loading...</h3>;

  if (channels) {
    channelsContent = renderChannels();
  } else {
    channelsContent = <h3>Cannot load channels...</h3>;
  }

  let categoriesContent = <h3>Loading categories...</h3>;
  if (categories) {
    categoriesContent = renderCategories();
  }

  return (
    <div>
      <h1>Här har vi kanalerna</h1>
      <h3>Kategorier</h3>
      <div>{categoriesContent}</div>
      <div className={styles.channel_card_wrapper}>{channelsContent}</div>
    </div>
  );
};

export default Channels;
