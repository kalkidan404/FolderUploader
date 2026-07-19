const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");

const prisma = new PrismaClient();


// Show share page
exports.shareGet = async (req, res) => {

    const { id } = req.params;


    try {

        const folder = await prisma.folder.findFirst({

            where: {

                id: id,

                ownerId: req.user.id

            }

        });


        if (!folder) {

            return res.send("Folder not found");

        }


        res.render("shareFolder", {

            folder

        });


    } catch (err) {

        console.log(err);

        res.send("Error loading share page");

    }

};




// Create share link
exports.sharePost = async (req, res) => {

    const { id } = req.params;

    const { days } = req.body;


    try {

        const folder = await prisma.folder.findFirst({

            where: {

                id: id,

                ownerId: req.user.id

            }

        });


        if (!folder) {

            return res.send("Folder not found");

        }



        const expiresAt = new Date();


        expiresAt.setDate(

            expiresAt.getDate() + Number(days)

        );



        const share = await prisma.shareLink.create({

            data: {

                token: uuidv4(),

                expiresAt,

                folderId: folder.id

            }

        });



        const link = `${req.protocol}://${req.get("host")}/share/${share.token}`;


        res.render("shareSuccess", {

            link

        });


    } catch (err) {

        console.log(err);

        res.send("Could not create share link");

    }

};




// View shared folder publicly
exports.viewSharedFolder = async (req, res) => {

    const { token } = req.params;


    try {


        const share = await prisma.shareLink.findUnique({

            where: {

                token: token

            },

            include: {

                folder: {

                    include: {

                        files: true

                    }

                }

            }

        });



        if (!share) {

            return res.send("Share link not found");

        }



        if (share.expiresAt < new Date()) {

            return res.send("This share link has expired");

        }



        res.render("sharedFolder", {

            folder: share.folder

        });



    } catch (err) {

        console.log(err);

        res.send("Error loading shared folder");

    }

};