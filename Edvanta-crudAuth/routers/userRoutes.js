const express = require("express");
const router = express.Router();

const {
  register,
  login,
  updateUser,
  deleteUser,
} = require("../controllers/userController");


const { auth } = require("../middlewares/auth");

// to use this middleware for register and login valivation
// i have already use a validation in userController line 16 and line 67, so i do'nt use this middleware here 

const {
  registerValidation,
  loginValidation,
} = require("../middlewares/userValidation");



router.post("/register", register);

router.post("/login", login);

router.put("/update", auth, updateUser);

router.delete("/delete", auth, deleteUser);

// export router
module.exports = router;
