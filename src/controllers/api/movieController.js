const movieService = require("@/service/movieService.js");
const response = require("@/utils/response");

exports.getList = async (req, res) => {
  const movies = await movieService.getAll();
  response.success(res, 200, movies);
};

exports.getOne = async (req, res) => {
  response.success(res, 200, req.movie);
};

exports.create = async (req, res) => {
  const result = await movieService.create(req.body);
  response.success(res, 201, result);
};

exports.update = async (req, res) => {
  const result = await movieService.create(req.movie.id, req.body);
  response.success(res, 200, result);
};
exports.remove = async (req, res) => {
  await movieService.remove(req.movie.id);
  response.success(res, 204);
};
