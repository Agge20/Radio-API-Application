const express = require("express");
const router = express.Router();

const channelController = require("../controllers/channelController");

router.get("/channels", channelController.getAllChannels);
router.get("/channel/:channelId", channelController.getChannelById);
router.get("/schedule/:channelId", channelController.getChannelSchedule);

module.exports = router;
