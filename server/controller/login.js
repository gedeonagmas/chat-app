const { Signup } = require("../models/signupModel");
const { tokRes } = require("./tokenGenerator");

exports.login = async (req, res, next) => {
  const { userName, password } = req.body;
  const user = await Signup.findOne({ userName: userName, status: "active" }).select("+password");
  if (!userName || !password) return res.status(404).json({ msg: "provide user name and password" });
  if (!user || !(await user.checkPasswordMatch(password, user.password)))
    return res.status(404).json({ msg: "invalid user name or password" });
  tokRes({ user, res, sc: 200, done: "login successful" });
};
