const { checkSchema } = require("express-validator");
const handleValidationErrors = require("./handleValidationError");

exports.createComment = [
  checkSchema({
    content: {
      notEmpty: true,
      errorMessage: "Content is required",
    },
    postId: {
      notEmpty: true,
      isInt: true,
      errorMessage: "Valid postId is required",
    },
  }),

  handleValidationErrors,
];

exports.updateComment = [
  checkSchema({
    content: {
      optional: true,
      notEmpty: true,
      errorMessage: "Content must not be empty if provided",
    },
    postId: {
      optional: true,
      isInt: true,
      errorMessage: "postId must be a valid integer if provided",
    },
  }),
  handleValidationErrors,
];
