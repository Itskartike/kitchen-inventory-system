const db = require("../models/db");

// Link ingredient to menu item (add recipe ingredient)
exports.addMenuItemIngredient = async (req, res) => {
  const { menu_item_name, ingredient_name, amount } = req.body;
  if (!menu_item_name || !ingredient_name || !amount) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const menuResult = await db.query(
      "SELECT id FROM menu_items WHERE name = $1",
      [menu_item_name]
    );
    const menuResults = Array.isArray(menuResult)
      ? menuResult[0]
      : menuResult.rows;
    if (menuResults.length === 0) {
      return res.status(400).json({ error: "Invalid menu item name" });
    }
    const menu_item_id = menuResults[0].id;

    const ingResult = await db.query(
      "SELECT id FROM ingredients WHERE name = $1",
      [ingredient_name]
    );
    const ingResults = Array.isArray(ingResult) ? ingResult[0] : ingResult.rows;
    if (ingResults.length === 0) {
      return res.status(400).json({ error: "Invalid ingredient name" });
    }
    const ingredient_id = ingResults[0].id;

    const result = await db.query(
      "INSERT INTO menu_item_ingredients (menu_item_id, ingredient_id, amount) VALUES ($1, $2, $3) RETURNING id",
      [menu_item_id, ingredient_id, amount]
    );
    const newId = Array.isArray(result)
      ? result[0].insertId
      : result.rows[0].id;
    res.json({ success: true, id: newId });
  } catch (err) {
    res.status(500).json({ error: { message: err.message, stack: err.stack } });
  }
};
