const { body, validationResult } = require("express-validator");


// Register validation rules
const validateRegister = [

    body("username")
        .trim()
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters"),


    body("email")
        .trim()
        .isEmail()
        .withMessage("Enter a valid email"),


    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters")

];



// Check validation errors
const validate = (req, res, next) => {

    const errors = validationResult(req);


    if (!errors.isEmpty()) {

        return res.send(errors.array());

    }


    next();

};


module.exports = {

    validateRegister,

    validate

};