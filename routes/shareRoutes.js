const express = require("express");

const router = express.Router();

const shareController = require("../controllers/shareController");

const { isAuthenticated } = require("../middleware/authMiddleware");


// Share page
router.get(
    "/folders/:id/share",
    isAuthenticated,
    shareController.shareGet
);


// Generate share link
router.post(
    "/folders/:id/share",
    isAuthenticated,
    shareController.sharePost
);


// Public shared folder
router.get(
    "/share/:token",
    shareController.viewSharedFolder
);


module.exports = router;