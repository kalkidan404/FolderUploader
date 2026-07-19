const multer = require("multer");

const {
    CloudinaryStorage
} = require("multer-storage-cloudinary");


const cloudinary = require("../config/cloudinary");


const path = require("path");



const storage = new CloudinaryStorage({

    cloudinary: cloudinary,

    params: {

        folder: "fileUploader",

        allowed_formats: [

            "jpg",
            "jpeg",
            "png",
            "pdf",
            "docx"

        ]

    }

});



const upload = multer({

    storage: storage,

    limits: {

        fileSize: 5 * 1024 * 1024

    },


    fileFilter: (req, file, cb) => {


        const allowed = [

            ".jpg",
            ".jpeg",
            ".png",
            ".pdf",
            ".docx"

        ];


        const ext = path
            .extname(file.originalname)
            .toLowerCase();



        if (allowed.includes(ext)) {

            cb(null, true);

        } else {

            cb(new Error("File type not allowed"));

        }

    }

});


module.exports = upload;