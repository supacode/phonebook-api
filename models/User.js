const { Schema, model } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const excludeProps = require('../utils/excludeSchemaProps');

const userSchema = Schema({
  email: {
    type: String,
    required: [true, 'E-mail is required'],
    validate: [validator.isEmail, 'Enter a valid email'],
    unique: true,
    trim: true
  },
  password: {
    select: false,
    type: String,
    required: [true, 'Enter your password']
  },
  confirmPassword: {
    type: String,
    required: [true, 'Confirm your password'],
    validate: {
      validator: function(field) {
        return field === this.password;
      },
      message: 'Passwords do not match'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.methods.toJSON = function() {
  return excludeProps(this.toObject(), ['__v', 'password']);
};
userSchema.pre('save', async function(next) {
  const user = this;

  if (!user.isModified('password')) return next;

  user.password = await bcrypt.hash(user.password, 12);

  user.confirmPassword = undefined;

  next();
});

module.exports = model('User', userSchema);
