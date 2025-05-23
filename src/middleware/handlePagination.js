const response = require("@/utils/response.js");
const paginationConfig = require("@/configs/pagination.js");

function handlePagination(req, res, next) {
  const { default_page, default_limit, max_limit } = paginationConfig;
  const page = +req.query.page || default_page;
  const limit = +req.query.limit || default_limit;

  const maxLimit = max_limit;

  if (limit > maxLimit) limit = maxLimit;

  req.page = page;
  req.limit = limit;

  res.paginate = (result) => {
    response.paginate(res, result, page, limit);
  };

  next();
}

module.exports = handlePagination;
