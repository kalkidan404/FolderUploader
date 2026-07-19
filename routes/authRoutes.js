const express = require("express");
const passport = require("passport");

const authController = require("../controllers/authController");

const {
    validateRegister,
    validate
} = require("../middleware/validator");


const router = express.Router();


// Register
router.get(
    "/register",
    authController.registerGet
);


router.post(
    "/register",
    validateRegister,
    validate,
    authController.registerPost
);



// Login
router.get(
    "/login",
    authController.loginGet
);


router.post(
    "/login",
    passport.authenticate("local", {

        successRedirect: "/",

        failureRedirect: "/login"

    })
);



// Logout
router.get(
    "/logout",
    authController.logout
);


module.exports = router;