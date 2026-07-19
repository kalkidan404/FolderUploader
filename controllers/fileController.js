const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


// Show Upload Page
exports.uploadGet = async (req, res) => {

    const folders = await prisma.folder.findMany({

        where: {

            ownerId: req.user.id

        }

    });

    res.render("upload", {

        folders

    });

};



// Upload File
exports.uploadPost = async (req, res) => {

    try {

        if (!req.file) {

            return res.send("Please select a file");

        }


        const { folderId } = req.body;


        const folder = await prisma.folder.findFirst({

            where: {

                id: folderId,

                ownerId: req.user.id

            }

        });


        if (!folder) {

            return res.send("Folder not found");

        }


        await prisma.file.create({

            data: {

                originalName: req.file.originalname,

                storedName: req.file.filename || "",

                mimeType: req.file.mimetype,

                size: req.file.size,

                fileUrl: req.file.path,

                folderId: folderId

            }

        });


        res.redirect("/folders");


    } catch(err) {

        console.log(err);

        res.send("Upload failed");

    }

};
// Show file details
exports.getFileDetails = async (req, res) => {

    const { id } = req.params;


    try {

        const file = await prisma.file.findFirst({

            where: {

                id: id

            }

        });


        if (!file) {

            return res.send("File not found");

        }


        res.render("fileDetails", {

            file

        });


    } catch (err) {

        console.log(err);

        res.send("Error loading file");

    }

};



// Download file
exports.downloadFile = async (req, res) => {

    const { id } = req.params;


    try {

        const file = await prisma.file.findFirst({

            where: {

                id: Number(id)

            }

        });


        if (!file) {

            return res.send("File not found");

        }


        res.redirect(file.fileUrl);


    } catch (err) {

        console.log(err);

        res.send("Download failed");

    }

};
exports.deleteFile = async (req, res) => {

    try {


        const file = await prisma.file.findUnique({

            where: {

                id: Number(req.params.id)

            }

        });



        if(!file){

            return res.send("File not found");

        }



        await prisma.file.delete({

            where: {

                id: Number(req.params.id)

            }

        });



        res.redirect(`/folders/${file.folderId}`);



    } catch(err){

        console.log(err);

        res.send("Delete failed");

    }

};