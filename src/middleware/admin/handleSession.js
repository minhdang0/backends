const { randomUUID } = require("node:crypto");
const sessionModel = require("@/models/sessionModel");

async function handleSession(req, res, next) {
  let _sid = req.cookies.sid;
  let session = _sid && (await sessionModel.findBySid(req.cookies.sid));

  if (!session) {
    _sid = randomUUID();
    const date = new Date();
    session = await sessionModel.create({ sid: _sid });
    date.setDate(date.getDate() + 1);
    res.set("Set-Cookie", `sid=${_sid}; path=/; httpOnly; expires=${date}`);
  }

  req.session = JSON.parse(session.data ?? null) ?? {};

  res.setFlash = (data) => {
    if (data.type && data.message) {
      req.session.flash = req.session.flash || {};
      req.session.flash[data.type] = req.session.flash[data.type] || [];
      req.session.flash[data.type].push(data.message);
    } else {
      req.session.flash = data;
    }
  };

  res.getFlashMessage = (type) => {
    if (type) {
      return req.session.flash[type] || [];
    }

    return req.session.flash;
  };

  res.on("finish", () => {
    sessionModel.update(_sid, {
      data: JSON.stringify(req.session),
    });
  });

  next();
}

module.exports = handleSession;
