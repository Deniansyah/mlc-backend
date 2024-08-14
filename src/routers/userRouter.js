const express = require("express");
const { getUsers, getUser, createNewUser, updateExistingUser, deleteExistingUser } = require("../controllers/userController");
const authenticateToken = require("../middlewares/auth");

const router = express.Router();

// Route untuk mendapatkan semua pengguna
router.get("/", authenticateToken, getUsers);

// Route untuk mendapatkan satu pengguna berdasarkan ID
router.get("/:id", authenticateToken, getUser);

// Route untuk membuat pengguna baru
router.post("/", createNewUser);

// Route untuk memperbarui pengguna yang ada
router.put("/:id", authenticateToken, updateExistingUser);

// Route untuk menghapus pengguna
router.delete("/:id", authenticateToken, deleteExistingUser);

module.exports = router;
