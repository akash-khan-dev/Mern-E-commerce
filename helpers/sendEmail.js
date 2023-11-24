const nodemailer = require("nodemailer");

async function sendEmail(email, verify, template) {
  const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "ak6220336@gmail.com",
      pass: "mukxromfyevmthlh",
    },
  });
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "ak620336@gmail.com", // sender address
    to: email, // list of receivers
    subject: "Verification OTP", // Subject line
    html: template(verify),
  });
}
module.exports = sendEmail;
