const userService = require("@/service/userService");

exports.index = async (req, res) => {
  const page = req.query.page ?? 1;
  const { items, total } = await userService.getAll(page, 20);

  // req.session.set("name", "Nguyen van A");
  // console.log(req.session.get("name"));

  res.render("admin/users/index", {
    users: items,
    total,
  });
};

exports.show = async (req, res) => {
  const user = await userService.getById(+req.params.id);
  res.render("admin/users/show", { user, errors: {} });
};

exports.create = async (req, res) => {
  res.render("admin/users/create", {
    errors: {},
    old: {},
  });
};

exports.store = async (req, res) => {
  const { confirmPassword, ...body } = req.body;
  const user = await userService.create(body);
  res.setFlash({
    type: "success",
    message: "Successfully created user!",
  });
  console.log(res.getFlashMessage("success"));
  res.redirect("/admin/users");
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  await userService.remove(id);
  res.redirect("/admin/users");
};

exports.edit = async (req, res) => {
  const user = await userService.getById(req.params.id);
  res.render("admin/users/edit", {
    errors: {},
    user,
  });
};

exports.update = async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const user = await userService.update(id, data);
  res.redirect(`/admin/users/${id}/edit`);
};
