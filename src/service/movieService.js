const movieModel = require("../models/movieModel.js");

class MovieService {
  async getAll() {
    const movies = await movieModel.findALl();
    return movies;
  }

  async getById(id) {
    const movie = await movieModel.findById(id);
    return movie;
  }

  async create(data) {
    const result = await movieModel.create(data);
    return result;
  }

  async update(id, data) {
    const results = await movieModel.update(id, data);
    return results;
  }

  async remove(id) {
    const result = await movieModel.remove(id);
    return result;
  }
}

const movieService = new MovieService();
module.exports = movieService;
