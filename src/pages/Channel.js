import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { ChannelsContext } from "../context/ChannelsContext.js";

const Channel = (props) => {
  const history = useHistory();
  const { getChannelById, specificChannel } = useContext(ChannelsContext);
  //Get the id-params and store it in a variable
  const { channelId } = props.match.params;

  //On render it fetches the specific channel based on id
  useEffect(() => {
    console.log("props: ", props);
    console.log("This is channelId id in Channel:  ", channelId);
    console.log(("PROPS PARAMS ", props.params));
    //getChannelById(channelId);
    console.log("this is specificChannel: ", specificChannel);
  }, []);
  let content = <h3>Loading...</h3>;
  //Function that renders the channel
  const renderChannel = () => {
    return <h2>This is the channel name: {specificChannel.name}</h2>;
  };

  if (specificChannel) {
    content = renderChannel();
  } else {
    content = <h3>Cannot load channel...</h3>;
  }
  return (
    <div>
      <h1>This is channel page</h1>
      {content}
    </div>
  );
};

export default Channel;
