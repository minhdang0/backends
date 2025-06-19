const db = require("@/configs/db");

exports.findAll = async (page = 1, limit = 10) => {
  const offset = (+page - 1) * +limit;

  const [results] = await db.query(
    `select id, first_name, last_name, username, email, dob, bio, gender, avatar, created_at from users order by created_at asc limit ? offset ?`,
    [limit, offset]
  );
  return results;
};

exports.countNewUser = async () => {
  const date = new Date();
  const currentDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  const startTime = `${currentDate} 00:00:00`;
  const endTime = `${currentDate} 23:59:59`;

  const [[{ count }]] = await db.query(
    "select count(*) as count from users where created_at ? between ?",
    [startTime, endTime]
  );
  return count;
};
exports.findById = async (id) => {
  const [results] = await db.query(`select * from users where id = ?`, [id]);
  return results ?? null;
};

exports.count = async () => {
  const [[{ total }]] = await db.query("select count(*) as total from users");
  return total;
};
exports.create = async (data) => {
  const fields = [
    "first_name",
    "last_name",
    "username",
    "email",
    "is_active",
    "password",
    "created_at",
  ];
  const now = new Date();
  data.created_at = now;
  data.update_at = now;

  const values = fields.map((field) => data[field]);

  const placeholders = fields.map(() => "?").join(", ");
  const sql = `INSERT INTO users (${fields.join(
    ", "
  )}) VALUES (${placeholders})`;

  const [result] = await db.query(sql, values);

  return { id: result.insertId, ...data };
};

exports.update = async (id, data) => {
  const fields = [
    "first_name",
    "last_name",
    "username",
    "email",
    "gender",
    "is_active",
    "password",
    "updated_at",
  ];

  data.updated_at = new Date();

  const setClause = fields.map((field) => `${field} = ?`).join(", ");
  const values = fields.map((field) => data[field]);

  const sql = `UPDATE users SET ${setClause} WHERE id = ?`;

  await db.query(sql, [...values, id]);

  return { id, ...data };
};

exports.remove = async (id) => {
  const [{ affectedRows }] = await db.query(`delete from users where id = ?`, [
    id,
  ]);
  return affectedRows > 0;
};

exports.findByEmailAndPassword = async (email, password) => {
  const [users] = await db.query(
    `select * from users where email = ? and password = ?`,
    [email, password]
  );
  return users[0];
};
