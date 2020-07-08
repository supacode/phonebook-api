const catchAsync = require('../utils/catchAsync');
const Contact = require('../models/Contact');

exports.createContact = catchAsync(async (req, res, next) => {
  const { name, phone, email, type } = req.body;

  const { user } = req;

  const contact = await Contact.create({ user, name, phone, email, type });

  res.status(201).json({
    status: 'success',
    data: { contact }
  });
});

exports.getAllContacts = catchAsync(async (req, res, next) => {
  const contacts = await Contact.find({ user: req.user });

  res.status(200).json({
    status: 'success',
    data: {
      count: contacts.length,
      contacts
    }
  });
});

exports.getOneContact = catchAsync(async (req, res, next) => {
  const contact = await Contact.find({ _id: req.params.id, user: req.user });

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

exports.deleteContact = catchAsync(async (req, res, next) => {
  await Contact.findByIdAndDelete(req.params.id);

  res.status(204).json({});
});
