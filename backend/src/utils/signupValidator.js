const { body } = require('express-validator');
const validator = require('validator');

exports.signupValidator = [
  body('name')
    .isLength({ min: 20, max: 60 })
    .withMessage('Name must be between 20 and 60 characters'),

  body('email')
    .custom((value) => {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email format');
      }
      return true;
    }),

  body('address')
    .isLength({ min: 10, max: 400 })
    .withMessage('Address must be between 10 and 400 characters'),

  body('password')
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)
    .withMessage(
      'Password must be at least 8 characters, contain one uppercase letter and one special character'
    ),
];
