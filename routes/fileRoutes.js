const express = require("express");

const router = express.Router();

const fileController = require("../controllers/fileController");

const { isAuthenticated } = require("../middleware/authMiddleware");

const upload = require("../middleware/multer");



// Upload page
router.get(
    "/upload",
    isAuthenticated,
    fileController.uploadGet
);



// Upload file
router.post(

    "/upload",

    isAuthenticated,

    upload.single("file"),

    fileController.uploadPost

);



// File details
router.get(

    "/files/:id",

    isAuthenticated,

    fileController.getFileDetails

);



// Download file
router.get(

    "/files/:id/download",

    isAuthenticated,

    fileController.downloadFile

);



// Delete file
router.delete(

    "/files/:id",

    isAuthenticated,

    fileController.deleteFile

);


module.exports = router;