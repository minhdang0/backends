exports.index = async (req, res) => {
  res.render("admin/auth/forgot-password", {
    layout: "admin/layouts/adminLayout",
  });
};
