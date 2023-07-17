const jwt = require("jsonwebtoken");

exports.tokRes = (val) => {
  const token = jwt.sign({ id: val.user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
    //secure:true,//only for production environment
  };
  val.res.cookie("jwt", token, cookieOptions);
  return val.res.status(val.sc).json({ message: val.done, token, user: val.user });
};
