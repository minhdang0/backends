const userService = require("@/service/userService");
const md5 = require("md5");
const userModel = require("@/models/userModel");
const { createToken, verifyToken } = require("@/utils/jwt");
const transporter = require("@/configs/mail");

exports.register = async (req, res) => {
  const user = await userService.create({
    email: req.body.email,
    password: md5(req.body.password),
  });

  const token = createToken(
    { userId: user.id },
    {
      expiresIn: 60 * 60 * 12,
    }
  );

  const verifyUrl = `${req.protocol}://${req.host}/admin/verify-email?token=${token}`;

  await transporter.sendMail({
    from: "mailer@fullstack.edu.vn",
    to: user.email,
    html: `
            <div>
                <p>
                    Nhấn vào đây để xác thực:
                </p>
                <p>
                    <a href="${verifyUrl}">Xác minh tài khoản</a>
                </p>
            </div>
        `,
  });

  res.setFlash({
    type: "success",
    message: `Chúng tôi đã gửi một email xác thực tới ${user.email}. Hãy kiểm tra inbox và xác minh để tiếp tục.`,
  });
  res.redirect("/admin/login");
};

exports.login = async (req, res) => {
  const email = req.body.email;
  const password = md5(req.body.password);

  const user = await userModel.findByEmailAndPassword(email, password);
  if (user) {
    req.session.userId = user.id;
    return res.redirect("/admin/users");
  }
};

exports.logout = async (req, res) => {
  delete req.session.userId;
  res.redirect("/admin/login");
};

exports.verifyEmail = async (req, res) => {
  // Nhận token từ query parameter
  const token = req.query.token;

  // Xác thực token hợp lệ
  const verify = verifyToken(token);

  // Xác thực thành công
  if (verify.success) {
    // Lất userId từ token
    const userId = verify.data.userId;

    // Lấy user từ DB
    const user = await userService.getById(userId);
    console.log(user);
    // Nếu verify rồi thì chuyển qua login kèm message lỗi
    if (user.verified_at) {
      res.setFlash({
        type: "info",
        message: "Liên kết xác minh đã hết hạn hoặc không hợp lệ.",
      });
      return res.redirect("/admin/login");
    }

    // Cập nhật verified_at vào user với thời gian hiện tại (thời gian user click vào link xác thực trong email)
    await userService.update(userId, {
      verified_at: new Date(),
    });
    res.send("Verify success");
    return;
  }
  res.send("Verify fail");
};
