import { createContext, useState, useEffect } from "react";

export const ChannelsContext = createContext();

const ChannelsProvider = (props) => {
  const [channels, setChannels] = useState(null);
  const [specificChannel, setSpecificChannel] = useState(null);
  const [channelPrograms, setChannelPrograms] = useState(null);

  useEffect(() => {
    getAllChannels();
  }, []);

  //Fetch all channels
  const getAllChannels = async () => {
    let channelsToGet = await fetch("/api/v1/channels");
    channelsToGet = await channelsToGet.json();
    setChannels(channelsToGet.channels);
  };

  //Fetch specific channel that user clicked on
  const getChannelById = async (channelId) => {
    console.log("channelId in context, ", channelId);
    let channel = await fetch(`/api/v1/channel/${channelId}`);
    channel = await channel.json();
    console.log("channel: ", channel);
    setSpecificChannel(channel);
  };
  //Fetch specific channel that user clicked on
  const getProgramById = async (channelId) => {
    let programs = await fetch(`/api/v1/channel/programs/${channelId}`);
    programs = await programs.json();
    console.log("PROGRAMS: ", programs);
    setChannelPrograms(programs);
  };
  const values = {
    channels,
    specificChannel,
    getChannelById,
    getProgramById,
    channelPrograms,
  };

  return (
    <ChannelsContext.Provider value={values}>
      {props.children}
    </ChannelsContext.Provider>
  );
};

export default ChannelsProvider;
