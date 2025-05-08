const { checkSchema } = require("express-validator");
const handleValidationErrors = require("./handleValidationError");

exports.createTodo = [
  checkSchema({
    title: {
      notEmpty: true,
      errorMessage: "Title is required",
    },
    description: {
      errorMessage: "Title is required",
    },
  }),
  handleValidationErrors,
];

exports.updateTodo = [
  checkSchema({
    title: {
      optional: true,
      notEmpty: true,
      errorMessage: "Title must not be empty if provided",
    },
    description: {
      optional: true,
      notEmpty: true,
      errorMessage: "Product must not be empty if provided",
    },
    isCompleted: {
      optional: true,
      isBoolean: true,
      errorMessage: "isCompleted must be a boolean value",
    },
  }),
  handleValidationErrors,
];
