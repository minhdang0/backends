const db = require("@/configs/db");

exports.findAll = async (page = 1, limit = 10) => {
  const offset = (+page - 1) * +limit;

  const [results] = await db.query(
    `select id, first_name, last_name, username, email, dob, bio, gender, avatar, created_at from users order by created_at asc limit ? offset ?`,
    [limit, offset]
  );
  return results;
};

exports.findById = async (id) => {
  const [results] = await db.query(
    `select * from users where id = ? or username = ?`,
    [id, id]
  );
  return results[0] ?? null;
};

exports.count = async () => {
  const [[{ total }]] = await db.query("select count(*) as total from users");
  return total;
};
exports.create = async (data) => {
  // ....
  // insert into users (first_name, last_name) values ("Tung", "Minh");
  // return new user
};

exports.update = async (id, data) => {
  // ....
  // update users set last_name = "Tung", first_name = "Minh", username = "tungminh", email = "tungminh@gmail.com" where id = 4;
  // return new user
};

exports.remove = async (id) => {
  const [{ affectedRows }] = await db.query(`delete from users where id = ?`, [
    id,
  ]);
  return affectedRows > 0;
};
