const { checkSchema } = require("express-validator");
const handleValidationErrors = require("./handleValidationError");

exports.createCategory = [
  checkSchema({
    name: {
      notEmpty: true,
      errorMessage: "Name is not empty",
    },
    description: {
      notEmpty: true,
      errorMessage: "Description is not empty",
    },
  }),
  handleValidationErrors,
];

exports.updateCategory = [
  checkSchema({
    name: {
      notEmpty: true,
      optional: true,
      errorMessage: "Name is not empty",
    },
    description: {
      notEmpty: true,
      optional: true,
      errorMessage: "Description is not empty",
    },
  }),
  handleValidationErrors,
];
