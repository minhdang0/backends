const userService = require("@/service/userService");

exports.index = async (req, res) => {
  const page = req.query.page ?? 1;
  const { items, total } = await userService.getAll(page, 20);
  res.render("admin/users/index", {
    users: items,
    total,
  });
};

exports.show = async (req, res) => {
  const user = await userService.getById(+req.params.id);
  console.log(user);
  res.render("admin/users/show", { user });
};
