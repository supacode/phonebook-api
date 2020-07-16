const { Schema, model, SchemaTypes } = require('mongoose');
const validator = require('validator');
const excludeProps = require('../utils/excludeSchemaProps');

const contactSchema = Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      required: [true, 'Contact must be attached to a user'],
    },
    name: {
      type: String,
      required: [true, 'Contact must have a name'],
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
      validate: [validator.isEmail, 'Enter a valid email'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['personal', 'professional'],
      default: 'personal',
    },
  },
  {
    timestamps: true,
  },
);

contactSchema.methods.toJSON = function() {
  return excludeProps({ schema: this.toObject() });
};

module.exports = model('Contact', contactSchema);
