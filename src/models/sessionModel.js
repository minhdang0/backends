const db = require("@/configs/db");
const { buildInsertQuery, buildUpdateQuery } = require("@/utils/queryBuilder");

/**
 * Tìm session theo session ID
 * @param {string} sid - Session ID
 * @returns {Object|null} Session object hoặc null nếu không tìm thấy
 */
exports.findBySid = async (sid) => {
  const [rows] = await db.query(`SELECT * FROM sessions WHERE sid = ?`, [sid]);
  return rows[0] || null;
};

/**
 * Tạo session mới
 * @param {Object} data - Dữ liệu session
 * @param {string} data.sid - Session ID (bắt buộc)
 * @param {Object} [data.data={}] - Dữ liệu session
 * @returns {Object} Session được tạo
 */
exports.create = async (data) => {
  const sessionData = {
    sid: data.sid,
    data: data.data || {},
    create_at: new Date(),
    updated_at: new Date(),
    ...data,
  };

  const { columns, placeholders, values } = buildInsertQuery(sessionData);

  const query = `INSERT INTO sessions (${columns}) VALUES (${placeholders});`;
  const [{ insertId }] = await db.query(query, values);

  return {
    id: insertId,
    ...sessionData,
  };
};

/**
 * Cập nhật session theo session ID
 * @param {string} sid - Session ID
 * @param {Object} data - Dữ liệu cần cập nhật
 * @returns {Object} Session đã được cập nhật
 */
exports.update = async (sid, data) => {
  // Tự động cập nhật updated_at
  const updateData = {
    ...data,
    updated_at: new Date(),
  };

  const { setClause, values } = buildUpdateQuery(updateData);
  values.push(sid);

  const query = `UPDATE sessions SET ${setClause} WHERE sid = ?;`;
  await db.query(query, values);

  return {
    sid,
    ...updateData,
  };
};

/**
 * Xóa session theo session ID
 * @param {string} sid - Session ID
 * @returns {boolean} true nếu xóa thành công, false nếu không
 */
exports.remove = async (sid) => {
  const [{ affectedRows }] = await db.query(
    `DELETE FROM sessions WHERE sid = ?`,
    [sid]
  );
  return affectedRows > 0;
};

/**
 * Xóa tất cả sessions đã hết hạn
 * @param {number} maxAge - Thời gian tồn tại tối đa của session (milliseconds)
 * @returns {number} Số lượng sessions đã bị xóa
 */
exports.clearExpired = async (maxAge = 24 * 60 * 60 * 1000) => {
  // Mặc định 24 giờ
  const expiredTime = new Date(Date.now() - maxAge);

  const [{ affectedRows }] = await db.query(
    `DELETE FROM sessions WHERE updated_at < ?`,
    [expiredTime]
  );

  return affectedRows;
};

/**
 * Lấy tất cả sessions (có thể phân trang)
 * @param {Object} options - Tùy chọn truy vấn
 * @param {number} [options.limit] - Giới hạn số lượng kết quả
 * @param {number} [options.offset] - Vị trí bắt đầu
 * @returns {Array} Danh sách sessions
 */
exports.findAll = async (options = {}) => {
  let query = `SELECT * FROM sessions ORDER BY updated_at DESC`;
  const values = [];

  if (options.limit) {
    query += ` LIMIT ?`;
    values.push(options.limit);

    if (options.offset) {
      query += ` OFFSET ?`;
      values.push(options.offset);
    }
  }

  const [rows] = await db.query(query, values);
  return rows;
};

/**
 * Đếm tổng số sessions
 * @returns {number} Tổng số sessions
 */
exports.count = async () => {
  const [rows] = await db.query(`SELECT COUNT(*) as count FROM sessions`);
  return rows[0].count;
};

/**
 * Kiểm tra xem session có tồn tại không
 * @param {string} sid - Session ID
 * @returns {boolean} true nếu tồn tại, false nếu không
 */
exports.exists = async (sid) => {
  const [rows] = await db.query(
    `SELECT 1 FROM sessions WHERE sid = ? LIMIT 1`,
    [sid]
  );
  return rows.length > 0;
};

/**
 * Cập nhật thời gian updated_at của session (touch session)
 * @param {string} sid - Session ID
 * @returns {boolean} true nếu thành công, false nếu không tìm thấy session
 */
exports.touch = async (sid) => {
  const [{ affectedRows }] = await db.query(
    `UPDATE sessions SET updated_at = ? WHERE sid = ?`,
    [new Date(), sid]
  );
  return affectedRows > 0;
};
