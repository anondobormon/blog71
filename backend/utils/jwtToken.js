const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  //Options or cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, options).json({
    verified: true,
    user,
    isAuthenticated: true,
    message: "You are logged in successfully",
    token,
  });
};
module.exports = sendToken;
