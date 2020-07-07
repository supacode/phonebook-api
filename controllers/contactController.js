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

exports.getOneContact = catchAsync(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      contact
    }
  });
});

exports.updateContact = catchAsync(async (req, res, next) => {
  const updateContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: 'success',
    data: {
      contact: updateContact
    }
  });
});
