// routes/order.js
const express = require("express");
const {
  placeOrder,
  getOrders,
  updateOrderStatus,
  getOrderHistory,
} = require("../controllers/orderController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, getOrders);
router.post("/", authMiddleware, placeOrder);
router.put("/:orderId", authMiddleware, updateOrderStatus);
router.get("/history", authMiddleware, getOrderHistory);

module.exports = router;
