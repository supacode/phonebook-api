const catchAsync = require('../utils/catchAsync');
const Contact = require('../models/Contact');

exports.createContact = catchAsync(async (req, res, next) => {
  const { name, phone, email, type } = req.body;

  const contact = await Contact.create({ name, phone, email, type });

  res.status(201).json({
    status: 'success',
    data: { contact }
  });
});
