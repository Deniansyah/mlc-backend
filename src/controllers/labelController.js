const { getAllLabels, getLabelById, createLabel, updateLabel, deleteLabel } = require("../models/labelModel");

const getLabels = async (req, res) => {
  try {
    const labels = await getAllLabels();
    res.status(200).json(labels);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getLabel = async (req, res) => {
  try {
    const { id } = req.params;
    const label = await getLabelById(id);

    if (!label) {
      return res.status(404).json({ message: "Label not found" });
    }

    res.status(200).json(label);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const createNewLabel = async (req, res) => {
  try {
    const { name, description, category_id } = req.body;
    const newLabel = await createLabel(name, description, category_id);

    res.status(201).json({ message: "Label created successfully", label: newLabel });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

const updateExistingLabel = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category_id } = req.body;

    const updatedLabel = await updateLabel(id, name, description, category_id);

    if (!updatedLabel) {
      return res.status(404).json({ message: "Label not found" });
    }

    res.status(200).json({ message: "Label updated successfully", label: updatedLabel });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const deleteExistingLabel = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedLabel = await deleteLabel(id);

    if (!deletedLabel) {
      return res.status(404).json({ message: "Label not found" });
    }

    res.status(200).json({ message: "Label deleted successfully", label: deletedLabel });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { getLabels, getLabel, createNewLabel, updateExistingLabel, deleteExistingLabel };
