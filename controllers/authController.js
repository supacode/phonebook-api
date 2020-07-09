const jwt = require('jsonwebtoken');

const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');

const createSendToken = (
  options = { user: null, statusCode: null, res: null }
) => {
  const { user, statusCode, res } = options;

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: `${process.env.JWT_EXPIRY_DAYS} days`
  });

  const cookieExpiry = new Date(
    Date.now() + process.env.JWT_EXPIRY_DAYS * 24 * 60 * 60 * 1000
  );

  const cookieOptions = {
    httpOnly: true,
    expires: cookieExpiry,
    secure: process.env.NODE_ENV === 'production'
  };

  res
    .status(statusCode)
    .cookie('jwt', token, cookieOptions)
    .json({
      status: 'success',
      user,
      token
    });
};

exports.register = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;

  const user = await User.create({ name, email, password, passwordConfirm });

  createSendToken({ user, statusCode: 201, res });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePasswords(password, user.password))) {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid login credentials'
    });
  }

  createSendToken({ user, res, statusCode: 200 });
});

exports.isAuth = (req, res, next) => {
  const { user } = req;

  if (!user) {
    return res.status(401).json({
      status: 'error',
      message: 'Not allowed to perform that action'
    });
  }

  res.status(200).json({
    status: 'success',
    user
  });

  next();
};

exports.getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    count: users.length,
    users
  });
});

exports.protectRoutes = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'You are not allowed to do that'
    });
  }

  const unsignedToken = jwt.verify(token, process.env.JWT_SECRET);

  const isJwtExpired =
    new Date(unsignedToken.exp * 1000) > new Date().getTime();

  if (!isJwtExpired) {
    return res.status(401).json({
      status: 'error',
      message: 'You are not allowed to do that'
    });
  }

  const user = await User.findById(unsignedToken.id);

  req.user = user;

  next();
});
