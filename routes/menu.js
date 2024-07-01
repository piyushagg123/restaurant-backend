const express = require("express");
const { getMenuItems, addMenuItem } = require("../controllers/menuController");
const router = express.Router();

router.get("/", getMenuItems);
router.post("/", addMenuItem);

module.exports = router;
