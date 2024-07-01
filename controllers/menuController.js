const MenuItem = require("../models/MenuItem");

exports.getMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ error: "Error fetching menu items" });
  }
};

exports.addMenuItem = async (req, res) => {
  const { name, description, price, category, imageUrl, type } = req.body;

  // Validate the type field to ensure it is one of the allowed values
  const validTypes = ["SNACKS", "DRINKS", "MAIN_COURSE", "DESSERT"];
  if (!validTypes.includes(type)) {
    return res.status(400).json({ error: "Invalid type for menu item" });
  }

  try {
    const menuItem = new MenuItem({
      name,
      description,
      price,
      category,
      imageUrl,
      type,
    });
    await menuItem.save();
    res.status(201).json({ message: "Menu item added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error adding menu item" });
  }
};
