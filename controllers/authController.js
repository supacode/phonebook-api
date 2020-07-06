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
