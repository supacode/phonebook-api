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

exports.getAllContacts = catchAsync(async (req, res, next) => {
  const contacts = await Contact.find({});

  res.status(200).json({
    status: 'success',
    data: {
      count: contacts.length,
      contacts
    }
  });
});
