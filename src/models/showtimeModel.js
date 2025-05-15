const db = require("@/configs/db");

exports.findALl = async () => {
  const [results] = await db.query("select * from showtime");
  return results;
};

exports.findById = async (id) => {
  const [results] = await db.query(`select * from showtime where id = ?`, [id]);
  return results[0] ?? null;
};

exports.create = async (data) => {
  const fields = [
    "movie_id",
    "date",
    "time",
    "available_seat",
    "created_at",
    "update_at",
  ];

  const now = new Date();
  data.created_at = now;
  data.update_at = now;

  const values = fields.map((field) => data[field]);

  const placeholders = fields.map(() => "?").join(", ");
  const sql = `INSERT INTO showtime (${fields.join(
    ", "
  )}) VALUES (${placeholders})`;

  const [result] = await db.query(sql, values);

  return { id: result.insertId, ...data };
};

exports.update = async (id, data) => {
  const fields = [
    "movie_id",
    "date",
    "time",
    "available_seat",
    "created_at",
    "update_at",
  ];
  data.update_at = new Date();

  const setClause = fields.map((field) => `${field} = ?`).join(", ");
  const values = fields.map((field) => data[field]);

  const sql = `UPDATE showtime SET ${setClause} WHERE id = ?`;

  await db.query(sql, [...values, id]);

  return { id, ...data };
};

exports.delete = async (id) => {
  const [result] = await db.query(`DELETE FROM showtime WHERE id = ?`, [id]);
  return result.affectedRows > 0;
};
