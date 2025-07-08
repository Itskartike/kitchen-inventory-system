const db = require("../models/db");

// Get SOP for a menu item
exports.getSOP = async (req, res) => {
  const { menuItemId } = req.params;
  console.log("getSOP called for menuItemId:", menuItemId);

  try {
    const sopResult = await db.query(
      "SELECT * FROM recipe_sops WHERE menu_item_id = $1",
      [menuItemId]
    );
    const sopRows = Array.isArray(sopResult) ? sopResult[0] : sopResult.rows;

    if (sopRows.length === 0) {
      console.log("No SOP found for menuItemId:", menuItemId);
      return res.json(null);
    }

    const sop = sopRows[0];

    const [stepsResult, ingredientsResult] = await Promise.all([
      db.query(
        "SELECT * FROM recipe_sop_steps WHERE sop_id = $1 ORDER BY step_number",
        [sop.id]
      ),
      db.query("SELECT * FROM recipe_sop_ingredients WHERE sop_id = $1", [
        sop.id,
      ]),
    ]);

    const steps = Array.isArray(stepsResult)
      ? stepsResult[0]
      : stepsResult.rows;
    const ingredients = Array.isArray(ingredientsResult)
      ? ingredientsResult[0]
      : ingredientsResult.rows;

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
  const isProduction = process.env.NODE_ENV === "production";

  const connection = isProduction
    ? await db.connect()
    : await db.getConnection();

  try {
    await connection.query("BEGIN");

    // 1. Insert or update recipe_sops table
    let sopId;
    if (isProduction) {
      const upsertQuery = `
        INSERT INTO recipe_sops (menu_item_id, notes, pdf_url) VALUES ($1, $2, $3)
        ON CONFLICT (menu_item_id) DO UPDATE SET notes = EXCLUDED.notes, pdf_url = EXCLUDED.pdf_url
        RETURNING id;
      `;
      const result = await connection.query(upsertQuery, [
        menuItemId,
        notes,
        pdf_url,
      ]);
      sopId = result.rows[0].id;
    } else {
      await connection.query(
        "INSERT INTO recipe_sops (menu_item_id, notes, pdf_url) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE notes = VALUES(notes), pdf_url = VALUES(pdf_url)",
        [menuItemId, notes, pdf_url]
      );
      const [sopRows] = await connection.query(
        "SELECT id FROM recipe_sops WHERE menu_item_id = ?",
        [menuItemId]
      );
      sopId = sopRows[0].id;
    }

    // 3. Remove old steps and ingredients
    await connection.query("DELETE FROM recipe_sop_steps WHERE sop_id = $1", [
      sopId,
    ]);
    await connection.query(
      "DELETE FROM recipe_sop_ingredients WHERE sop_id = $1",
      [sopId]
    );

    // 4. Insert new steps
    for (const [idx, step] of (steps || []).entries()) {
      await connection.query(
        "INSERT INTO recipe_sop_steps (sop_id, step_number, description) VALUES ($1, $2, $3)",
        [sopId, idx + 1, step]
      );
    }

    // 5. Insert new ingredients
    for (const ing of ingredients || []) {
      await connection.query(
        "INSERT INTO recipe_sop_ingredients (sop_id, ingredient_name, quantity, unit) VALUES ($1, $2, $3, $4)",
        [sopId, ing.ingredient_name, ing.quantity, ing.unit]
      );
    }

    await connection.query("COMMIT");
    res.json({ success: true });
  } catch (err) {
    await connection.query("ROLLBACK");
    console.error("Error saving SOP:", err);
    res.status(500).json({ error: "Failed to save SOP" });
  } finally {
    if (connection) connection.release();
  }
};
