const pool = require("../helpers/db");

// Ambil semua kategori
const getAllCategories = async () => {
  const query = "SELECT * FROM categories";
  const result = await pool.query(query);
  return result.rows;
};

// Ambil satu kategori berdasarkan ID
const getCategoryById = async (id) => {
  const query = "SELECT * FROM categories WHERE id = $1";
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

// Buat kategori baru
const createCategory = async (name, description) => {
  const query = "INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *";
  const result = await pool.query(query, [name, description]);
  return result.rows[0];
};

// Update kategori berdasarkan ID
const updateCategory = async (id, name, description) => {
  const query = "UPDATE categories SET name = $1, description = $2 WHERE id = $3 RETURNING *";
  const result = await pool.query(query, [name, description, id]);
  return result.rows[0];
};

// Hapus kategori berdasarkan ID
const deleteCategory = async (id) => {
  const query = "DELETE FROM categories WHERE id = $1 RETURNING *";
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

module.exports = { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
