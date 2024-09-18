const catchAsync = require("express-async-handler");
const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

const User = require("../models/user.model");
const config = require("../config");

const createToken = async (data, secret, expiresIn) =>
  jwt.sign(data, secret, {
    expiresIn,
  });

const signupHandler = catchAsync(async (req, res) => {
  const { fullName, email, password } = req.body;

  const isUserExists = await User.findOne({ email });

  if (isUserExists) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ success: false, message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({ fullName, email, password: hashedPassword });

  const token = await createToken({ id: user._id }, config.jwt.secret, "24h");

  res.status(httpStatus.OK).send({
    success: true,
    data: {
      token,
      user: _.pick(user, ["fullName", "email", "_id"]),
    },
  });
});

const signinHandler = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ success: false, message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ success: false, message: "Invalid credentials" });
  }

  const token = await createToken({ id: user._id }, config.jwt.secret, "24h");

  res.status(httpStatus.OK).send({
    success: true,
    data: {
      token,
      user: _.pick(user, ["fullName", "email", "_id"]),
    },
  });
});

const forgotPasswordHandler = catchAsync(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ success: false, message: "User not found" });
  }

  const resetToken = await createToken(
    { id: user._id },
    config.jwt.secret,
    "10m"
  );

  res.status(httpStatus.OK).json({
    success: true,
    data: {
      token: resetToken,
    },
  });
});

const resetPasswordHandler = catchAsync(async (req, res) => {
  const { token, password } = req.body;

  const decodedToken = jwt.verify(token, config.jwt.secret);

  const user = await User.findById(decodedToken.id);

  if (!user) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ success: false, message: "Invalid token" });
  }

  user.password = await bcrypt.hash(password, 12);
  await user.save();

  res.status(httpStatus.OK).json({
    success: true,
    data: {
      user: _.pick(user, ["fullName", "email", "_id"]),
    },
  });
});

const userController = {
  signupHandler,
  signinHandler,
  forgotPasswordHandler,
  resetPasswordHandler,
};

module.exports = userController;
