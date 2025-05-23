const userService = require("@/service/userService");
const response = require("@/utils/response");

exports.getList = async (req, res) => {
  const result = await userService.getAll(req.page, req.limit);
  res.paginate(result);
};

exports.getOne = async (req, res) => {
  response.success(res, 200, req.user);
};

exports.remove = async (req, res) => {
  await userService.remove(req.user.id);
  response.success(res, 204);
};
