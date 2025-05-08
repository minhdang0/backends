const { checkSchema } = require("express-validator");
const handleValidationErrors = require("./handleValidationError");

exports.createProduct = [
  checkSchema({
    name: {
      notEmpty: true,
      errorMessage: "Name is required",
    },
    description: {
      notEmpty: true,
      errorMessage: "Description is required",
    },
    price: {
      isFloat: { options: { gt: 0 } },
      errorMessage: "Price must be a positive number",
    },
    image: {
      isURL: true,
      errorMessage: "Image must be a valid URL",
    },
    categoryId: {
      notEmpty: true,
      errorMessage: "Category ID is required",
    },
    stock: {
      optional: true,
      isInt: { options: { min: 0 } },
      errorMessage: "Stock must be a non-negative integer",
    },
  }),
  handleValidationErrors,
];

exports.updateProduct = [
  checkSchema({
    name: {
      optional: true,
      notEmpty: true,
      errorMessage: "Name must not be empty if provided",
    },
    description: {
      optional: true,
      notEmpty: true,
      errorMessage: "Description must not be empty if provided",
    },
    price: {
      optional: true,
      isFloat: { options: { gt: 0 } },
      errorMessage: "Price must be a positive number",
    },
    image: {
      optional: true,
      isURL: true,
      errorMessage: "Image must be a valid URL",
    },
    categoryId: {
      optional: true,
      notEmpty: true,
      errorMessage: "Category ID must not be empty",
    },
    stock: {
      optional: true,
      isInt: { options: { min: 0 } },
      errorMessage: "Stock must be a non-negative integer",
    },
  }),
  handleValidationErrors,
];
