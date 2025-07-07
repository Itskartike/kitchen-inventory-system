const db = require("../models/db");

exports.completeOrder = async (req, res) => {
  const items = req.body.items; // [{id, quantity}, ...]
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "No items provided" });
  }

  const connection = await db.getConnection();
  await connection.beginTransaction();

  try {
    for (const { id: menuItemId, quantity: orderQty } of items) {
      const [ingredients] = await connection.query(
        `SELECT rsi.ingredient_name, rsi.quantity, i.id as ingredient_id, i.unit
         FROM recipe_sops rs
         JOIN recipe_sop_ingredients rsi ON rs.id = rsi.sop_id
         JOIN ingredients i ON rsi.ingredient_name = i.name
         WHERE rs.menu_item_id = ?`,
        [menuItemId]
      );

      for (const { ingredient_id, quantity, unit } of ingredients) {
        const [traceableRows] = await connection.query(
          "SELECT traceable FROM ingredients WHERE id = ?",
          [ingredient_id]
        );

        if (!traceableRows[0] || !Boolean(traceableRows[0].traceable)) {
          continue;
        }

        let totalDeduct = quantity * orderQty;
        let baseDeduct = totalDeduct;
        let baseUnit = unit;
        if (unit === "kg") {
          baseDeduct = totalDeduct * 1000;
          baseUnit = "gm";
        } else if (unit === "l") {
          baseDeduct = totalDeduct * 1000;
          baseUnit = "ml";
        }

        const [result] = await connection.query(
          `UPDATE ingredients SET quantity = quantity - ? WHERE id = ? AND unit = ? AND quantity >= ?`,
          [baseDeduct, ingredient_id, baseUnit, baseDeduct]
        );

        if (result.affectedRows === 0) {
          throw new Error(
            `Insufficient stock or unit mismatch for ingredient ID ${ingredient_id}`
          );
        }
      }
    }

    await connection.commit();
    res.json({ success: true });
  } catch (error) {
    await connection.rollback();
    res.status(400).json({ error: error.message });
  } finally {
    connection.release();
  }
};
