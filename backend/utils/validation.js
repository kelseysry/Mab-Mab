// backend/utils/validation.js
const { validationResult } = require('express-validator');

// Validate the info in the request body before using it 
// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => `${error.msg}`);

    const err = Error('Bad request.');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request.';
    next(err);
  }
  next(); // if no validation errors return from validationResult, invoke next middleware
};

module.exports = {
  handleValidationErrors,
};