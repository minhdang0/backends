require("module-alias/register");
const backupDatabase = require("./backupDatabase");
const sendDailyReportEmail = require("./sendDailyReportEmail");
const scheduleJob = require("@/utils/schedule");

scheduleJob("send_daily_email_report", "* * * * *", sendDailyReportEmail);
scheduleJob("bacup_database", "* * * * *", backupDatabase);
