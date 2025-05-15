const userService = require("@/service/userService");
const response = require("@/utils/response");

exports.getList = async (req, res) => {
  const users = await userService.getAll();
  response.success(res, 200, users);
};

exports.getOne = async (req, res) => {
  response.success(res, 200, req.user);
};

exports.remove = async (req, res) => {
  await userService.remove(req.user.id);
  response.success(res, 204);
};
