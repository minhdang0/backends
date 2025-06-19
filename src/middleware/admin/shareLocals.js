const userService = require("@/service/userService");

async function shareLocals(req, res, next) {
  res.locals.auth = null;

  const userId = req.session.userId;
  if (userId) {
    res.locals.auth = await userService.getById(userId);
  }

  res.locals.flash = req.session.flash;
  res.locals.getFlashMessage = res.getFlashMessage;

  delete req.session.flash;

  next();
}

module.exports = shareLocals;
