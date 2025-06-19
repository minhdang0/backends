const transporter = require("@/configs/mail");
const userService = require("@/service/userService");
const loadEmail = require("@/utils/loadEmail");

async function sendVerifyEmailJob(job) {
  const { userId } = JSON.parse(job.payload);

  const user = await userService.getById(userId);
  // Tạo link xác thực cho userId
  const token = "1234abcd"; // TODO: tạo JWT token
  const data = { token, userId };

  // Load email từ template ejs
  const template = await loadEmail("auth/verification", data);

  console.log(`Bắt đầu gửi email tới: ${user.email}`);

  const info = await transporter.sendMail({
    from: "mailer@fullstack.edu.vn>",
    subject: "Verification email",
    to: user.email,
    html: template,
  });

  // Update thời gian gửi email
  await userService.update(userId, {
    email_sent_at: new Date(),
  });
}

module.exports = sendVerifyEmailJob;
