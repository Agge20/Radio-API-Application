const express = require("express");

const router = express.Router();
const userController = require("../controllers/userController");

// User routes setup goes underneath here...
router.get("/whoami", userController.whoami);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/logout", userController.logout);

module.exports = router;
