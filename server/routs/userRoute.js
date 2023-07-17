const express = require("express");
const { getUsers } = require("../controller/getAllUsers");
const { signupHandler } = require("../controller/signup");
const { login } = require("./../controller/login");
const { upload } = require("./../utils/upload");
const { protect } = require("./../middleware/auth");
const { userValidator, isValidated } = require("./../utils/validator");
const userRouter = express.Router();

const profilePicture = upload.fields([
  {
    name: "profilePicture",
    maxCount: 1,
  },
]);

userRouter.post("/signup", profilePicture, userValidator, isValidated, signupHandler);
userRouter.post("/login", login);
userRouter.post("/get/all/users", protect, getUsers);

module.exports = { userRouter };
