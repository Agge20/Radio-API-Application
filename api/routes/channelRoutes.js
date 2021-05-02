const express = require("express");
const router = express.Router();

const channelController = require("../controllers/channelController");

router.get("/channels", channelController.getAllChannels);
router.get("/channel/:channelId", channelController.getChannelById);
router.get("/channel/programs/:channelId", channelController.getProgramById);
router.get("/categories", channelController.getAllCategories);
router.get("/programs/:categoryId", channelController.getProgramByCategory);
router.get(
  "/schedule/:channelId/:searchDate",
  channelController.getChannelSchedule
);

module.exports = router;
