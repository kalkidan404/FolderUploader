const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


// Show all folders
exports.getFolders = async (req, res) => {

    try {

        const folders = await prisma.folder.findMany({

            where: {

                ownerId: req.user.id

            }

        });


        res.render("folders", {

            folders

        });


    } catch(err) {

        console.log(err);

        res.send("Error loading folders");

    }

};



// Show create folder page
exports.createFolderGet = (req, res) => {

    res.render("createFolder");

};



// Create folder
exports.createFolder = async (req, res) => {

    try {


        await prisma.folder.create({

            data: {

                name: req.body.name,

                ownerId: req.user.id

            }

        });


        res.redirect("/folders");


    } catch(err) {

        console.log(err);

        res.send("Folder creation failed");

    }

};



// Open one folder
exports.getFolder = async (req, res) => {

    try {


        const folder = await prisma.folder.findUnique({

            where: {

                id: req.params.id

            },


            include: {

                files: true

            }

        });



        if(!folder){

            return res.send("Folder not found");

        }



        res.render("folder", {

            folder

        });


    } catch(err){

        console.log(err);

        res.send("Error loading folder");

    }

};



// Delete folder
exports.deleteFolder = async (req, res) => {

    try {


        await prisma.folder.delete({

            where: {

                id: req.params.id

            }

        });


        res.redirect("/folders");


    } catch(err){

        console.log(err);

        res.send("Delete folder failed");

    }

};