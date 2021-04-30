const express = require("express");

const router = express.Router();
const userController = require("../controllers/userController");

// User routes setup goes underneath here...
router.get("/whoami", userController.whoami);
router.get("/login", userController.login);
router.post("/register", userController.register);

module.exports = router;
