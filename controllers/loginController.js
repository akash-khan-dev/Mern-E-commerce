const emailValidation = require("../helpers/emailValidation");
const User = require("../models/userModels");
const bcrypt = require("bcrypt");

const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  if (!emailValidation(email)) {
    return (res.status(400).send = { Message: "Please enter valid email" });
  }
  const existingMail = await User.find({ email });
  if (existingMail.length > 0) {
    bcrypt.compare(password, existingMail[0].password, function (err, result) {
      if (result) {
        return res.status(200).json({
          Success: "Login success",
          firstName: existingMail[0].firstName,
          lastName: existingMail[0].lastName,
        });
      } else {
        return res.status(400).send("password Not match");
      }
    });
  } else {
    return res.status(400).send({ Message: "Email not Existing" });
  }
};
module.exports = loginController;
