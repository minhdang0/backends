const userModel = require("@/models/userModel");

class UserService {
  async getAll() {
    const users = await userModel.findAll();
    return users;
  }

  async getById(id) {
    const users = await userModel.findById(id);
    return users;
  }

  async remove(id) {
    return await userModel.remove(id);
  }
}

const userService = new UserService();

module.exports = userService;
