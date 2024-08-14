const express = require("express");
const { getCategories, getCategory, createNewCategory, updateExistingCategory, deleteExistingCategory } = require("../controllers/categoryController");
const authenticateToken = require("../middlewares/auth")

const router = express.Router();

// Route untuk mendapatkan semua kategori
router.get("/", authenticateToken, getCategories);

// Route untuk mendapatkan satu kategori berdasarkan ID
router.get("/:id", authenticateToken, getCategory);

// Route untuk membuat kategori baru
router.post("/", authenticateToken, createNewCategory);

// Route untuk memperbarui kategori yang ada
router.put("/:id", authenticateToken, updateExistingCategory);

// Route untuk menghapus kategori
router.delete("/:id", authenticateToken, deleteExistingCategory);

module.exports = router;
