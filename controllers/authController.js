const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();


// Register page
exports.registerGet = (req, res) => {

    res.render("register");

};



// Register user
exports.registerPost = async (req, res) => {

    try {

        const {
            username,
            email,
            password
        } = req.body;



        const existingUser = await prisma.user.findFirst({

            where: {

                OR: [

                    {
                        email: email
                    },

                    {
                        username: username
                    }

                ]

            }

        });



        if (existingUser) {

            return res.send(
                "User already exists"
            );

        }



        const hashedPassword = await bcrypt.hash(

            password,

            10

        );



        await prisma.user.create({

            data: {

                username,

                email,

                password: hashedPassword

            }

        });



        res.redirect("/login");


    } catch (err) {

        console.log(err);

        res.send("Registration failed");

    }

};



// Login page
exports.loginGet = (req, res) => {

    res.render("login");

};



// Logout
exports.logout = (req, res, next) => {


    req.logout((err) => {


        if (err) {

            return next(err);

        }


        res.redirect("/login");


    });


};