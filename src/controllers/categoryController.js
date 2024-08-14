const { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require("../models/categoryModel");

const getCategories = async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await getCategoryById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const createNewCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newCategory = await createCategory(name, description);

    res.status(201).json({ message: "Category created successfully", category: newCategory });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const updateExistingCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const updatedCategory = await updateCategory(id, name, description);

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category updated successfully", category: updatedCategory });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const deleteExistingCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await deleteCategory(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully", category: deletedCategory });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { getCategories, getCategory, createNewCategory, updateExistingCategory, deleteExistingCategory };
