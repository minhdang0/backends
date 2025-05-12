const throwError = require("./throwError");

function throw404(message = "Not found") {
  console.log(123);
  throwError(404, message);
}

module.exports = throw404;
