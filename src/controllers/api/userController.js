const userService = require("@/service/userService");
const response = require("@/utils/response");
const transporter = require("@/configs/mail");
const path = require("path");
const loadEmail = require("@/utils/loadEmail");

exports.getEmailImage = async (req, res) => {
  const userId = req.params.id;
  await userService.update(userId, {
    email_seen_at: new Date(),
  });

  const imgPath = path.join(__dirname, "../../../", `public/img/logo.png`);
  res.sendFile(imgPath);
};

exports.getList = async (req, res) => {
  const userId = 304; // FakeAdd commentMore actions
  const data = { token: "1234abcd", userId };
  const template = await loadEmail("auth/verification", data);

  // return res.send(template);
  const info = await transporter.sendMail({
    from: `" <dangnhatminh8402@gmail.com>`,
    subject: "Test email",
    to: "dangnhatminh08042002@gmail.com",
    html: template,
  });
  await userService.update(userId, {
    email_sent_at: new Date(),
  });

  const result = await userService.getAll(req.page, req.limit);
  res.paginate(result);
};

exports.getOne = async (req, res) => {
  response.success(res, 200, req.user);
};

exports.remove = async (req, res) => {
  await userService.remove(req.user.id);
  response.success(res, 204);
};
