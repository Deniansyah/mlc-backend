const pool = require("../helpers/db");

// Ambil semua label
const getAllLabels = async () => {
  const query = "SELECT * FROM labels";
  const result = await pool.query(query);
  return result.rows;
};

// Ambil satu label berdasarkan ID
const getLabelById = async (id) => {
  const query = "SELECT * FROM labels WHERE id = $1";
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

// Buat label baru dengan category_id
const createLabel = async (name, description, categoryId) => {
  const query = "INSERT INTO labels (name, description, category_id) VALUES ($1, $2, $3) RETURNING *";
  const result = await pool.query(query, [name, description, categoryId]);
  return result.rows[0];
};

// Update label berdasarkan ID
const updateLabel = async (id, name, description, categoryId) => {
  const query = "UPDATE labels SET name = $1, description = $2, category_id = $3 WHERE id = $4 RETURNING *";
  const result = await pool.query(query, [name, description, categoryId, id]);
  return result.rows[0];
};

// Hapus label berdasarkan ID
const deleteLabel = async (id) => {
  const query = "DELETE FROM labels WHERE id = $1 RETURNING *";
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

module.exports = { getAllLabels, getLabelById, createLabel, updateLabel, deleteLabel };
