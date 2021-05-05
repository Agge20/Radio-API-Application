const express = require("express");
const router = express.Router();

const favoritesController = require("../controllers/favoritesController");

router.post("/save-favorite", favoritesController.saveFavorite);
router.post("/all-favorites", favoritesController.getAllFavorites);
router.delete("/delete-favorite", favoritesController.deleteFavorite);

module.exports = router;
