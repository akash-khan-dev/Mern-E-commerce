const emailValidation = require("../helpers/emailValidation");
const nameValidation = require("../helpers/nameValidation");
const otpTemplate = require("../helpers/otpTemplate");
const sendEmail = require("../helpers/sendEmail");
const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const aleaRNGFactory = require("number-generator/lib/aleaRNGFactory");
const generateToken = require("../helpers/token");
const register = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      telephone,
      address,
      city,
      postCode,
      country,
      state,
      bYear,
      bMonth,
      bDay,
    } = req.body;
    // fname validation
    if (!nameValidation(firstName)) {
      return res.status(400).send({
        error: "First Name Is not valid",
      });
    }
    // last name validation
    if (!nameValidation(lastName)) {
      return res.status(400).send({
        error: "Last Name Is not valid",
      });
    }
    // email validations
    if (!emailValidation(email)) {
      return res.status(400).send({
        error: "Email is not valid",
      });
    }
    // if email is included
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).send("Email already in use");
    }
    // hashing passwords & save data
    bcrypt.hash(password, 10, async function (err, hash) {
      let userData = await new User({
        firstName,
        lastName,
        email,
        password: hash,
        telephone,
        address,
        city,
        postCode,
        country,
        state,
        bYear,
        bMonth,
        bDay,
      });
      //save the database
      userData.save();
      //token generate
      const token = generateToken({ id: userData._id.toString() }, "30m");
      //random OTP generated
      const generator = aleaRNGFactory(Date.now());
      const OTP = generator.uInt32().toString().substring(0, 5);
      //  update random OTP fill
      let randomOTPStore = await User.findOneAndUpdate(
        { email },
        { $set: { randomOTP: OTP } },
        { new: true }
      );
      // three second late delete otp
      setTimeout(async () => {
        await User.findOneAndUpdate(
          { email },
          { $unset: { randomOTP: "" } },
          { new: true }
        );
      }, 3000);
      // set mail settings

      sendEmail(email, randomOTPStore, otpTemplate);

      res.json({
        FirstName: userData.firstName,
        LastName: userData.lastName,
        email: userData.email,
        token: token,
        bYear: userData.bYear,
        bMonth: userData.bMonth,
        bDay: userData.bDay,
        message: "registration successful",
      });
    });
  } catch (err) {
    console.log(err.message, "what");
  }
};

module.exports = register;
