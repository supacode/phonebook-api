const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');

exports.register = catchAsync(async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;

  const user = await User.create({ email, password, confirmPassword });

  res.status(201).json({
    status: 'success',
    data: { user }
  });
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

  res.status(200).json({
    status: 'success',
    data: { user }
  });
});
