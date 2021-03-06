// This module allows me to make frontend fetches from my backend.
const fetch = require("node-fetch");
const json = "format=json";
const paginationFalse = "pagination=false";

const utils = require("../core/utilities.js");

//Get all channels
const getAllChannels = async (req, res) => {
  let channels = await fetch(
    `http://api.sr.se/api/v2/channels?${json}&${paginationFalse}`
  );
  channels = await channels.json();
  res.json(channels);
};

//Get channelById
const getChannelById = async (req, res) => {
  let channel = await fetch(
    `http://api.sr.se/api/v2/channels/${req.params.channelId}?${json}&${paginationFalse}`
  );
  channel = await channel.json();
  res.json(channel);
};
//Get program by id
const getProgramById = async (req, res) => {
  let programs = await fetch(
    `http://api.sr.se/api/v2/programs/index?format=json&channelid=${req.params.channelId}&pagination-false`
  );
  programs = await programs.json();
  res.json(programs);
};

const getAllCategories = async (req, res) => {
  let categories = await fetch(
    `http://api.sr.se/api/v2/programcategories?format=json`
  );
  categories = await categories.json();
  res.json(categories);
};

const getProgramByCategory = async (req, res) => {
  let programs = await fetch(
    `http://api.sr.se/api/v2/programs/index?programcategoryid=${req.params.categoryId}&format=json&pagination-false`
  );
  programs = await programs.json();
  console.log("This is the programs based on categoryId", programs);
  res.json(programs);
};

const getChannelSchedule = async (req, res) => {
  let channelSchedule = await fetch(
    `http://api.sr.se/api/v2/scheduledepisodes?${json}&${paginationFalse}&channelId=${req.params.channelId}&date=${req.params.searchDate}`
  );
  channelSchedule = await channelSchedule.json();

  // channelSchedule.schedule = channelSchedule.schedule.map((p) => {
  //   console.log(new Date(p.starttimeutc));
  //   return {
  //     ...p,
  //     starttimeutc: utils.convertToDateObject(p.starttimeutc),
  //     endtimeutc: utils.convertToDateObject(p.endtimeutc),
  //   };
  // });

  res.json(channelSchedule);
};

module.exports = {
  getAllChannels,
  getChannelById,
  getChannelSchedule,
  getProgramById,
  getAllCategories,
  getProgramByCategory,
  getChannelSchedule,
};
