const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncError = require("./asyncError");
const Token = require("../models/tokenModel");
const crypto = require("crypto");
const { sendMail } = require("../utils/sendEmail");
const sendToken = require("../utils/jwtToken");

exports.isvarified = asyncError(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) return next(new ErrorHandler("Internal server error!", 404));

  const isExistUserIdInToken = await Token.findOne({ userId: user._id });

  if (isExistUserIdInToken) {
    await isExistUserIdInToken.remove();
  }

  if (!user.verified) {
    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const url = `${process.env.BASE_URL}/user/${user._id}/${token.token}`;

    await sendMail(user.email, "Verify Email...", url);

    // next(new ErrorHandler("Please verify your email!"))

    res.status(200).json({
      verified: false,
      isAuthenticated: false,
      user: null,
      message: "Please verify your email!",
    });
  } else {
    sendToken(user, 201, res);
  }
});
