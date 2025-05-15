const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  //   password: 'something',
  database: "bookticket_dev",
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

module.exports = db;
