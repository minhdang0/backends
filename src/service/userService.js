const userModel = require("@/models/userModel");

class UserService {
  async getAll(page, limit) {
    const items = await userModel.findAll(page, limit);
    const total = await userModel.count();

    return { items, total };
  }

  async getById(id) {
    const users = await userModel.findById(id);
    return users[0] ?? null;
  }

  async remove(id) {
    return await userModel.remove(id);
  }
  async update(id, data) {
    const user = await userModel.update(id, data);
    return user;
  }
  async create(data) {
    const user = await userModel.create(data);
    return user;
  }
}

const userService = new UserService();

module.exports = userService;
