import { createContext, useState, useEffect } from "react";

export const ChannelsContext = createContext();

const ChannelsProvider = (props) => {
  const [channels, setChannels] = useState(null);
  const [specificChannel, setSpecificChannel] = useState(null);
  const [channelPrograms, setChannelPrograms] = useState(null);
  const [categories, setCategories] = useState(null);
  const [programsByCategory, setProgramsByCategory] = useState(null);
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    getAllChannels();
    getAllCategories();
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

  //Fetch all categories
  const getAllCategories = async () => {
    let categories = await fetch(`/api/v1/categories`);
    categories = await categories.json();
    console.log("Categories: ", categories);
    setCategories(categories);
  };

  //Fetch all programs based on category
  const getProgramsByCategory = async (categoryId) => {
    let programs = await fetch(`/api/v1/programs/${categoryId}`);
    console.log("categoryId in context", categoryId);
    programs = await programs.json();
    setProgramsByCategory(programs);
  };

  //Fetch schedule by date and channelId
  const getChannelSchedule = async (channelId, searchDate) => {
    let schedule = await fetch(`/api/v1/schedule/${channelId}/${searchDate}`);
    console.log("SchduleTest", schedule);
    schedule = await schedule.json();
    setSchedule(schedule);
  };
  const values = {
    channels,
    specificChannel,
    getChannelById,
    getProgramById,
    channelPrograms,
    getAllCategories,
    categories,
    getProgramsByCategory,
    programsByCategory,
    schedule,
    setSchedule,
    getChannelSchedule,
  };

  return (
    <ChannelsContext.Provider value={values}>
      {props.children}
    </ChannelsContext.Provider>
  );
};

export default ChannelsProvider;
