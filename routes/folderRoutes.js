const express = require("express");

const router = express.Router();

const folderController = require("../controllers/folderController");

const { isAuthenticated } = require("../middleware/authMiddleware");


// Show all folders
router.get(
    "/folders",
    isAuthenticated,
    folderController.getFolders
);


// Show create folder page
router.get(
    "/folders/new",
    isAuthenticated,
    folderController.createFolderGet
);


// Create folder
router.post(
    "/folders",
    isAuthenticated,
    folderController.createFolder
);


// View single folder
router.get(
    "/folders/:id",
    isAuthenticated,
    folderController.getFolder
);


// Delete folder
router.delete(
    "/folders/:id",
    isAuthenticated,
    folderController.deleteFolder
);


module.exports = router;