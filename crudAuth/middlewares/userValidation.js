
const {body} = require("express-validator");

module.exports.registerValidation = [
    body('userName').not().isEmpty().trim().escape().withMessage("Name is required"),
    body("email").isEmail().normalizeEmail().trim().escape().withMessage("Email is required"),
    body("password").isLength({min : 8}).trim().withMessage("password must be 8 character")
]

module.exports.loginValidation = [
    body("email").isEmail().normalizeEmail().trim().escape().withMessage("Email is required"),
    body("password").not().isEmpty().withMessage("password is required")
]