const db = require("../models/db");

// Link ingredient to menu item (add recipe ingredient)
exports.addMenuItemIngredient = async (req, res) => {
  const { menu_item_name, ingredient_name, amount } = req.body;
  if (!menu_item_name || !ingredient_name || !amount) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const [menuResults] = await db.query(
      "SELECT id FROM menu_items WHERE name = ?",
      [menu_item_name]
    );
    if (menuResults.length === 0) {
      return res.status(400).json({ error: "Invalid menu item name" });
    }
    const menu_item_id = menuResults[0].id;

    const [ingResults] = await db.query(
      "SELECT id FROM ingredients WHERE name = ?",
      [ingredient_name]
    );
    if (ingResults.length === 0) {
      return res.status(400).json({ error: "Invalid ingredient name" });
    }
    const ingredient_id = ingResults[0].id;

    const [result] = await db.query(
      "INSERT INTO menu_item_ingredients (menu_item_id, ingredient_id, amount) VALUES (?, ?, ?)",
      [menu_item_id, ingredient_id, amount]
    );
    res.json({ success: true, id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
