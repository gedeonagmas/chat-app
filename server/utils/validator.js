const { body } = require("express-validator");
const { validationResult } = require("express-validator");
const { Signup } = require("./../models/signupModel");
const { unlink } = require("fs/promises");

exports.userValidator = [
  body("firstName")
    .isLength({ min: 4 })
    .withMessage(`first name must be greater than 3 character`)
    .isLength({ max: 100 })
    .withMessage(`first name must be less than 100 character`)
    .isAlpha("en-US", { ignore: " " })
    .withMessage(`first name must contains only character`),
  body("lastName")
    .isLength({ min: 4 })
    .withMessage(`last name must be greater than 3 character`)
    .isLength({ max: 100 })
    .withMessage(`last name must be less than 100 character`)
    .isAlpha("en-US", { ignore: " " })
    .withMessage("last name must contains only character"),
  body("userName")
    .isLength({ min: 4 })
    .withMessage(`user name must be greater than 3 character`)
    .isLength({ max: 50 })
    .withMessage(`user name must be less than 50 character`)
    .custom(async (val) => {
      const data = await Signup.find({ userName: val });
      if (data.length > 0) throw new Error(`user name is already taken please try another user name`);
      return true;
    }),
  body("email")
    .isEmail()
    .withMessage(`invalid email`)
    .custom(async (val, { req }) => {
      const data = await Signup.find({ email: req.body.email });
      if (data.length !== 0) throw new Error(`this email is already registered try with different email`);
      return true;
    }),
  body("phone")
    .isNumeric()
    .withMessage(`phone must be a number`)
    .isLength({ min: 9 })
    .withMessage(`please insert a valid phone`)
    .isLength({ max: 10 })
    .withMessage(`please insert a valid phone`),
  body("password")
    .isLength({ min: 8 })
    .withMessage("minimum password length is 8")
    .isLength({ max: 16 })
    .withMessage("maximum password length is 16")
    .isStrongPassword({
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
      pointsPerUnique: 1,
      pointsPerRepeat: 0.5,
      pointsForContainingLower: 10,
      pointsForContainingUpper: 10,
      pointsForContainingNumber: 10,
      pointsForContainingSymbol: 10,
    })
    .withMessage("password must contains at least 1 number, 1 capital letter, 1 small letter, 1 special character"),
  body("confirmPassword").custom((val, { req }) => {
    if (req.body.password !== val) throw new Error("password not much");
    return true;
  }),
];

exports.isValidated = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (req.files.profilePicture !== undefined) {
      await unlink(req.files.profilePicture[0].path);
    }
    return res.status(400).json({ msg: errors.array() });
  }
  next();
};
