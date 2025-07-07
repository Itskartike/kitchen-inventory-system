const db = require("../models/db");

// Get SOP for a menu item
exports.getSOP = async (req, res) => {
  const { menuItemId } = req.params;
  console.log("getSOP called for menuItemId:", menuItemId);

  try {
    const [sopRows] = await db.query(
      "SELECT * FROM recipe_sops WHERE menu_item_id = ?",
      [menuItemId]
    );

    if (sopRows.length === 0) {
      console.log("No SOP found for menuItemId:", menuItemId);
      return res.json(null);
    }

    const sop = sopRows[0];

    const [[steps], [ingredients]] = await Promise.all([
      db.query(
        "SELECT * FROM recipe_sop_steps WHERE sop_id = ? ORDER BY step_number",
        [sop.id]
      ),
      db.query("SELECT * FROM recipe_sop_ingredients WHERE sop_id = ?", [
        sop.id,
      ]),
    ]);

    const result = { ...sop, steps, ingredients };
    console.log("Returning SOP:", result);
    res.json(result);
  } catch (err) {
    console.error("Error fetching SOP:", err);
    res.status(500).json({ error: "Failed to fetch SOP" });
  }
};

// Create or update SOP for a menu item
exports.createOrUpdateSOP = async (req, res) => {
  const menuItemId = req.params.menuItemId;
  const { notes, pdf_url, steps, ingredients } = req.body;

  try {
    // 1. Insert or update recipe_sops table
    await db.query(
      "INSERT INTO recipe_sops (menu_item_id, notes, pdf_url) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE notes = VALUES(notes), pdf_url = VALUES(pdf_url)",
      [menuItemId, notes, pdf_url]
    );

    // 2. Get the sop_id for this menu item
    const [sopRows] = await db.query(
      "SELECT id FROM recipe_sops WHERE menu_item_id = ?",
      [menuItemId]
    );
    const sopId = sopRows[0].id;

    // 3. Remove old steps and ingredients
    await db.query("DELETE FROM recipe_sop_steps WHERE sop_id = ?", [sopId]);
    await db.query("DELETE FROM recipe_sop_ingredients WHERE sop_id = ?", [
      sopId,
    ]);

    // 4. Insert new steps
    for (const [idx, step] of (steps || []).entries()) {
      await db.query(
        "INSERT INTO recipe_sop_steps (sop_id, step_number, description) VALUES (?, ?, ?)",
        [sopId, idx + 1, step]
      );
    }

    // 5. Insert new ingredients
    console.log("Received ingredients:", ingredients);
    for (const ing of ingredients || []) {
      await db.query(
        "INSERT INTO recipe_sop_ingredients (sop_id, ingredient_name, quantity, unit) VALUES (?, ?, ?, ?)",
        [sopId, ing.ingredient_name, ing.quantity, ing.unit]
      );
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Error saving SOP:", err);
    res.status(500).json({ error: "Failed to save SOP" });
  }
};
