const mongoose = require("mongoose");
const Order = require("../model/order");
const Menu = require("../model/menu");

const placeOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { items } = req.body;

    // Validate required fields
    if (!userId || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "User ID and items are required!",
      });
    }

    // Validate each item in the order
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const { menuItemId, quantity } = item;

      // Validate menuItemId and quantity
      if (!menuItemId || !mongoose.Types.ObjectId.isValid(menuItemId)) {
        return res.status(400).json({
          message: `Invalid menu item ID: ${menuItemId}`,
        });
      }
      if (!quantity || typeof quantity !== "number" || quantity <= 0) {
        return res.status(400).json({
          message: `Quantity must be a positive number for menu item: ${menuItemId}`,
        });
      }

      // Check menu item existence and availability
      const menuItem = await Menu.findById(menuItemId);
      if (!menuItem) {
        return res.status(404).json({
          message: `Menu item not found: ${menuItemId}`,
        });
      }
      if (!menuItem.availability) {
        return res.status(400).json({
          message: `Menu item is not available: ${menuItem.name}`,
        });
      }

      // Calculate total amount and prepare order items
      totalAmount += menuItem.price * quantity;
      orderItems.push({ menuItemId, quantity });
    }

    // Create and save the order
    const newOrder = new Order({
      userId,
      items: orderItems,
      totalAmount,
      status: "Pending",
    });

    await newOrder.save();

    res.status(201).json({
      message: "Order placed successfully!",
      order: newOrder,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const fetchUserOrders = async (req, res) => {
  try {
    // Assuming `req.user.id` contains the logged-in user's ID
    const userId = req.user.userId;

    // Fetch all orders for the logged-in user
    const orders = await Order.find({ userId })
      .populate({
        path: "items.menuItemId",
        select: "name price category",
      }) // Populating menu item details for better readability
      .sort({ createdAt: -1 }); // Sort orders by most recent first

    // Check if the user has no orders
    if (orders.length === 0) {
      return res.status(404).json({
        message: "No orders found for this user.",
      });
    }

    res.status(200).json({
      message: "Orders fetched successfully!",
      orders,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  placeOrder,
  fetchUserOrders,
};
