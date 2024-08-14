const bcrypt = require("bcrypt");
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require("../models/userModel");

const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const createNewUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(username, hashedPassword);

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const updateExistingUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await updateUser(id, username, hashedPassword);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const deleteExistingUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUser(id);

    if (!deletedUser) {
      return res.status(404).json({ message });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { getUsers, getUser, createNewUser, updateExistingUser, deleteExistingUser };
