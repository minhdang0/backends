const { checkSchema } = require("express-validator");
const handleValidationErrors = require("./handleValidationError");

exports.createUser = [
  (req, res, next) => {
    res.view = "admin/users/create";
    next();
  },
  checkSchema({
    first_name: {
      notEmpty: true,
      errorMessage: "First name is not empty",
    },
    last_name: {
      notEmpty: true,
      errorMessage: "Last name is not empty",
    },
    email: {
      notEmpty: {
        errorMessage: "Email is not empty",
      },
      isEmail: {
        errorMessage: "Must be email",
      },
    },
  }),
  handleValidationErrors,
];

exports.updateUser = [
  (req, res, next) => {
    res.view = "admin/users/show";
    next();
  },
  checkSchema({
    first_name: {
      notEmpty: {
        errorMessage: "First name cannot be empty",
      },
      isLength: {
        options: { min: 2, max: 50 },
        errorMessage: "First name must be between 2-50 characters",
      },
      trim: true,
    },
    last_name: {
      notEmpty: {
        errorMessage: "Last name cannot be empty",
      },
      isLength: {
        options: { min: 2, max: 50 },
        errorMessage: "Last name must be between 2-50 characters",
      },
      trim: true,
    },
    username: {
      notEmpty: {
        errorMessage: "Username cannot be empty",
      },
      isLength: {
        options: { min: 3, max: 30 },
        errorMessage: "Username must be between 3-30 characters",
      },
      isAlphanumeric: {
        errorMessage: "Username can only contain letters and numbers",
      },
      trim: true,
    },
    email: {
      notEmpty: {
        errorMessage: "Email cannot be empty",
      },
      isEmail: {
        errorMessage: "Must be a valid email address",
      },
      normalizeEmail: true,
      trim: true,
    },
    gender: {
      optional: true,
      isIn: {
        options: [["male", "female", "other"]],
        errorMessage: "Gender must be male, female, or other",
      },
    },
  }),
  handleValidationErrors,
];
