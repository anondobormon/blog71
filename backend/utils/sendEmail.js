//Node mailer
//External Imports
const nodemailer = require("nodemailer");
const asyncError = require("../middleware/asyncError");

exports.sendMail = asyncError(async (email, subject, text) => {
  let transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.MAIL,
    to: email,
    subject: subject,
    text: text,
  });
});
