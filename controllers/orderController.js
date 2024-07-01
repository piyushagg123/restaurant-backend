const Order = require("../models/Order");

exports.placeOrder = async (req, res) => {
  const { tableNumber, orderItems, totalAmount } = req.body;
  const userId = req.user.id; // Assuming req.user contains the authenticated user

  try {
    const order = new Order({
      user: userId,
      tableNumber,
      orderItems,
      totalAmount,
    });
    await order.save();
    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error placing order" });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("orderItems.menuItem");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Error fetching orders" });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.status = "completed";
    await order.save();

    res.status(200).json({ message: "Order marked as completed" });
  } catch (error) {
    res.status(500).json({ error: "Error updating order status" });
  }
};

// controllers/orderController.js
exports.getOrderHistory = async (req, res) => {
  const userId = req.user.id; // Assuming req.user contains the authenticated user

  try {
    const orders = await Order.find({ user: userId })
      .populate({
        path: "orderItems.menuItem", // Populate menuItem field in orderItems array
        select: "name price description category imageUrl", // Select fields to include
      })
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Error fetching order history" });
  }
};
