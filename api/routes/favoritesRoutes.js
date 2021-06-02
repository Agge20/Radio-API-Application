const express = require("express");
const router = express.Router();

const favoritesController = require("../controllers/favoritesController");

router.post("/save-favorite", favoritesController.saveFavorite);
router.post(
  "/all-channel-favorites",
  favoritesController.getAllChannelFavorites
);
router.post(
  "/all-program-favorites",
  favoritesController.getAllProgramFavorites
);
router.delete("/delete-favorite-channel", favoritesController.deleteFavorite);
router.delete(
  "/delete-favorite-program",
  favoritesController.deleteProgramFavorite
);

module.exports = router;
