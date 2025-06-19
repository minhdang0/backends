function checkAuth(req, res, next) {
  const isAuthRequired = !["/register", "/login", "/verify-email"].includes(
    req.path
  );

  if (res.locals.auth && !res.locals.auth.verified_at && isAuthRequired) {
    // Chuyển qua /admin/login kèm báo lỗi
    res.setFlash({
      type: "error",
      message: "Vui lòng xác minh địa chỉ email trước.",
    });
    return res.redirect("/admin/login");
  }

  if (res.locals.auth && !isAuthRequired && res.locals.auth.verified_at) {
    return res.redirect("/admin/dashboard");
  }

  next();
}

module.exports = checkAuth;
