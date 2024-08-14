const pool = require("../helpers/db");

// Temukan pengguna berdasarkan username
const findUserByUsername = async (username) => {
  const query = "SELECT * FROM users WHERE username = $1";
  const result = await pool.query(query, [username]);
  return result.rows[0];
};

// Buat pengguna baru
const createUser = async (username, hashedPassword) => {
  const query = "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *";
  const result = await pool.query(query, [username, hashedPassword]);
  return result.rows[0];
};

module.exports = { findUserByUsername, createUser };
