const { checkSchema } = require("express-validator");
const handleValidationErrors = require("./handleValidationError");

exports.createPost = [
  checkSchema({
    title: {
      notEmpty: true,
      errorMessage: "Title is not empty",
    },
    content: {
      notEmpty: true,
      errorMessage: "Content is not empty",
    },
  }),
  handleValidationErrors,
];

exports.updatePost = [
  checkSchema({
    title: {
      notEmpty: true,
      optional: true,
      errorMessage: "Title is not empty",
    },
    content: {
      notEmpty: true,
      optional: true,
      errorMessage: "Content is not empty",
    },
  }),
  handleValidationErrors,
];
