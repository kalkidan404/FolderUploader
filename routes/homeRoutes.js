const express = require("express");

const router = express.Router();

const homeController = require("../controllers/homeController");

const {
    isAuthenticated
} = require("../middleware/authMiddleware");

router.get(
    "/",
    isAuthenticated,
    homeController.home
);

module.exports = router;