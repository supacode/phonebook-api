const catchAsync = require('../utils/catchAsync');
const Contact = require('../models/Contact');
const AppError = require('../utils/AppError');

exports.createContact = catchAsync(async (req, res, next) => {
  const { name, phone, email, type } = req.body;

  const contact = await Contact.create({
    user: req.user,
    name,
    phone,
    email,
    type,
  });

  res.status(201).json({
    status: 'success',
    contact,
  });
});

exports.getAllContacts = catchAsync(async (req, res, next) => {
  const contacts = await Contact.find({ user: req.user });

  res.status(200).json({
    status: 'success',
    count: contacts.length,
    contacts,
  });
});

exports.getOneContact = catchAsync(async (req, res, next) => {
  const contact = await Contact.find({ _id: req.params.id, user: req.user });

  if (!Object.keys(contact).length) {
    return next(
      new AppError({
        message: 'Contact not found',
        statusCode: 404,
      }),
    );
  }

  res.status(200).json({
    status: 'success',
    contact,
  });
});

exports.updateContact = catchAsync(async (req, res, next) => {
  const updateContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true },
  );

  if (!updateContact) {
    return next(
      new AppError({
        statusCode: 400,
        message: 'Failed to update contact',
      }),
    );
  }

  res.status(200).json({
    status: 'success',
    contact: updateContact,
  });
});

exports.deleteContact = catchAsync(async (req, res, next) => {
  await Contact.findByIdAndDelete(req.params.id);

  res.status(204).json({});
});
