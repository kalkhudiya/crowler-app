const { check } = require('express-validator/check');

const formClient = [
  check('name').exists(),
  check('email').isEmail(),
  check('phone').matches(/^[+][9][1][ ]\d{10}$/),
  check('company').exists(),
  check('zip').matches(/^\d{6}$/),
];

module.exports = {
  formClient,
};
