const { Signup } = require("../models/signupModel");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

exports.protect = async (req, res, next) => {
  console.log(req.body);
  let token, user;
  if (req.body.token) {
    token = req.body.token;
  }
  if (token === "null" || !token) return res.status(400).send("tokens not found please login again");
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);
  user = await Signup.findById(decode.id);
  if (!user) return res.status(400).send("users not found");
  req.user = user;
  next();
};
