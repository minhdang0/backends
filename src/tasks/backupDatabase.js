const fs = require("fs");
const path = require("path");
const spawn = require("child_process").spawn;
const userModal = require("@/models/userModel");

async function backupDatabase() {
  const fileName = `${Math.round(Date.now() / 1000)}.dump.sql`;
  const dumpFileName = fs.join(
    __dirname,
    "..",
    "storage",
    "backup-db",
    fileName
  );

  const writeStream = fs.createWriteStream(dumpFileName);
  const dump = spawn("mysqldump", [
    "-u",
    "admin",
    "-padmin@123mariadb",
    "express_dev",
  ]);

  dump.stdout
    .pipe(writeStream)
    .on("finish", function () {
      console.log("Completed");
    })
    .on("error", function (err) {
      console.log(err);
    });
}

module.exports = backupDatabase;
