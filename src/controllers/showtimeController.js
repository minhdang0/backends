const showtimeService = require("@/service/showtimeService.js");
const response = require("@/utils/response");

exports.getList = async (req, res) => {
  const showtime = await showtimeService.getAll();
  response.success(res, 200, showtime);
};

exports.getOne = async (req, res) => {
  response.success(res, 200, req.showtime);
};

exports.create = async (req, res) => {
  const result = await showtimeService.create(req.body);
  response.success(res, 201, result);
};

exports.update = async (req, res) => {
  const result = await showtimeService.create(req.showtime.id, req.body);
  response.success(res, 200, result);
};
exports.remove = async (req, res) => {
  await showtimeService.remove(req.showtime.id);
  response.success(res, 204);
};
