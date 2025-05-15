const showtimeByIdModel = require("../models/showtimeModel");

class MovieService {
  async getAll() {
    const showtime = await showtimeByIdModel.findALl();
    return showtime;
  }

  async getById(id) {
    const showtimeById = await showtimeByIdModel.findById(id);
    return showtimeById;
  }

  async create(data) {
    const result = await showtimeByIdModel.create(data);
    return result;
  }

  async update(id, data) {
    const results = await showtimeByIdModel.update(id, data);
    return results;
  }

  async remove(id) {
    const result = await showtimeByIdModel.remove(id);
    return result;
  }
}

const showtimeByIdService = new MovieService();
module.exports = showtimeByIdService;
