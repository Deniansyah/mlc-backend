const pool = require("../helpers/db");

// Ambil semua pengguna
const getAllUsers = async () => {
  const query = "SELECT * FROM users";
  const result = await pool.query(query);
  return result.rows;
};

// Ambil satu pengguna berdasarkan ID
const getUserById = async (id) => {
  const query = "SELECT * FROM users WHERE id = $1";
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

// Buat pengguna baru
const createUser = async (username, hashedPassword) => {
  const query = "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *";
  const result = await pool.query(query, [username, hashedPassword]);
  return result.rows[0];
};

// Update pengguna berdasarkan ID
const updateUser = async (id, username, hashedPassword) => {
  const query = "UPDATE users SET username = $1, password = $2 WHERE id = $3 RETURNING *";
  const result = await pool.query(query, [username, hashedPassword, id]);
  return result.rows[0];
};

// Hapus pengguna berdasarkan ID
const deleteUser = async (id) => {
  const query = "DELETE FROM users WHERE id = $1 RETURNING *";
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
