const response = require("@/utils/response");

function handleNotFound(req, res) {
  response.error(res, 404, "Not found");
}
module.exports = handleNotFound;
