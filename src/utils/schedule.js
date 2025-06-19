require("module-alias/register");
const cron = require("node-cron");
const { dispatch } = require("./queue");

cron.schedule("*/2 * * * *", () => {
  dispatch("sendVerifyEmailJob", { userId: 2 });
});
