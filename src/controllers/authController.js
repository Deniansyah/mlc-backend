const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findUserByUsername, createUser } = require("../models/authModel");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Cek apakah username sudah digunakan
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash password dan buat pengguna baru
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await createUser(username, hashedPassword);

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Cari pengguna berdasarkan username
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Periksa apakah password sesuai
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Buat token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { register, login };
