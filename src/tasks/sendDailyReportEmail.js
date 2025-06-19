const userModal = require("@/models/userModel");

async function sendDailyReportEmail() {
  const usersCount = await userModal.count();
  const newUsersCount = await userModal.countNewUser();

  const info = await transporter.sendMail({
    from: `" <dangnhatminh8402@gmail.com>`,
    subject: "Daily report",
    to: "dangnhatminh08042002@gmail.com",
    html: `
     <h1>Daily Report</h1>
     <p>New users: ${newUsersCount}</p>
     <p>Total users: ${usersCount}</p>
    `,
  });
}

module.exports = sendDailyReportEmail;
