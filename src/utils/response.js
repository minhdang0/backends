const success = (res, status, data, message) => {
  res.status(status).json({
    success: true,
    data,
    message,
  });
};
const error = (res, status, message, errors) => {
  res.status(status).json({
    success: false,
    message,
    errors,
  });
};

const response = { success, error };
module.exports = response;
