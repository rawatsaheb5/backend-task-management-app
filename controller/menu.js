const mongoose = require("mongoose");
const Menu = require("../model/menu");

const fetchAllMenu = async (req, res) => {
  try {
    let { page = 1, itemsPerPage = 10 } = req.query;

    // Validate pagination inputs
    page = Number(page);
    itemsPerPage = Number(itemsPerPage);
    if (isNaN(page) || page < 1 || isNaN(itemsPerPage) || itemsPerPage < 1) {
      return res.status(400).json({
        message: "Page and itemsPerPage must be positive numbers!",
      });
    }

    const skip = (page - 1) * itemsPerPage;
    const result = await Menu.find({}).skip(skip).limit(itemsPerPage);

    res.status(200).send({
      message: "Menu fetched successfully!",
      data: { result },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addNewMenuItem = async (req, res) => {
  try {
    const { name, availability, price, category } = req.body;

    // Validate required fields
    if (!name || typeof name !== "string") {
      return res
        .status(400)
        .json({ message: "Name is required and must be a string!" });
    }
    if (price === undefined || typeof price !== "number" || price <= 0) {
      return res
        .status(400)
        .json({ message: "Price is required and must be a positive number!" });
    }
    if (
      category &&
      !["Appetizers", "Main Course", "Desserts"].includes(category)
    ) {
      return res.status(400).json({
        message: "Category must be one of: Appetizers, Main Course, Desserts.",
      });
    }
    if (availability !== undefined && typeof availability !== "boolean") {
      return res
        .status(400)
        .json({ message: "Availability must be a boolean value!" });
    }

    const newItem = new Menu({
      name,
      availability: availability !== undefined ? availability : true,
      price,
      category: category || "Appetizers",
    });

    await newItem.save();
    res.status(200).send({
      message: "New item added successfully!",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, availability, price, category } = req.body;

    // Validate ID
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: "Invalid or missing menu item ID!" });
    }

    // Validate fields
    if (name && typeof name !== "string") {
      return res.status(400).json({ message: "Name must be a string!" });
    }
    if (price !== undefined && (typeof price !== "number" || price <= 0)) {
      return res
        .status(400)
        .json({ message: "Price must be a positive number!" });
    }
    if (
      category &&
      !["Appetizers", "Main Course", "Desserts"].includes(category)
    ) {
      return res.status(400).json({
        message: "Category must be one of: Appetizers, Main Course, Desserts.",
      });
    }
    if (availability !== undefined && typeof availability !== "boolean") {
      return res
        .status(400)
        .json({ message: "Availability must be a boolean value!" });
    }

    const item = await Menu.findByIdAndUpdate(
      id,
      { $set: { name, availability, price, category } },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ message: "Menu item not found!" });
    }

    res.status(200).send({
      message: "Menu item updated successfully!",
      data: item,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: "Invalid or missing menu item ID!" });
    }

    const item = await Menu.findByIdAndDelete(id);

    if (!item) {
      return res.status(404).json({ message: "Menu item not found!" });
    }

    res.status(200).send({
      message: "Item deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  fetchAllMenu,
  addNewMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
