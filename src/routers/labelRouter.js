const express = require("express");
const { getLabels, getLabel, createNewLabel, updateExistingLabel, deleteExistingLabel } = require("../controllers/labelController");
const authenticateToken = require("../middlewares/auth")

const router = express.Router();

// Route untuk mendapatkan semua label
router.get("/", authenticateToken, getLabels);

// Route untuk mendapatkan satu label berdasarkan ID
router.get("/:id", authenticateToken, getLabel);

// Route untuk membuat label baru
router.post("/", authenticateToken, createNewLabel);

// Route untuk memperbarui label yang ada
router.put("/:id", authenticateToken, updateExistingLabel);

// Route untuk menghapus label
router.delete("/:id", authenticateToken, deleteExistingLabel);

module.exports = router;
