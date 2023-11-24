const User = require("../models/userModels");

const matchOTP = async (req, res, next) => {
  const { randomOTP, email } = req.body;
  const existingMail = await User.find({ email });
  if (existingMail[0].randomOTP === randomOTP) {
    const removeOTP = await User.findOneAndUpdate(
      { email },
      { $unset: { randomOTP: "" } },
      { new: true }
    );
  } else {
    return res.send("OTP Not Match");
  }
};

module.exports = matchOTP;
