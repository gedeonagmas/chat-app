const { validationResult } = require("express-validator");
const { Signup } = require("./../models/signupModel");

exports.signupHandler = async (req, res, next) => {
  const { firstName, lastName, userName, email, phone, password } = req.body;
  const profilePic = req.files.profilePicture;

  await Signup.create({
    firstName,
    lastName,
    userName,
    email,
    phone,
    password,
    profilePicture: profilePic ? profilePic[0].path : undefined,
  });
  return res.status(201).json({ msg: "account created" });
};
