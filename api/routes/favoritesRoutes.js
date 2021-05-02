const express = require("express");
const router = express.Router();

const favoritesController = require("../controllers/favoritesController");

router.post("/save-favorite", favoritesController.saveFavorite);

module.exports = router;
