const db = require("../models/db");

exports.completeOrder = async (req, res) => {
  const items = req.body.items; // [{id, quantity}, ...]
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "No items provided" });
  }

  // Use a single client for PostgreSQL transaction
  const connection =
    process.env.NODE_ENV === "production"
      ? await db.connect()
      : await db.getConnection();

  try {
    await connection.query("BEGIN");

    for (const { id: menuItemId, quantity: orderQty } of items) {
      const ingredientsResult = await connection.query(
        `SELECT rsi.ingredient_name, rsi.quantity, i.id as ingredient_id, i.unit
         FROM recipe_sops rs
         JOIN recipe_sop_ingredients rsi ON rs.id = rsi.sop_id
         JOIN ingredients i ON rsi.ingredient_name = i.name
         WHERE rs.menu_item_id = $1`,
        [menuItemId]
      );
      const ingredients = Array.isArray(ingredientsResult)
        ? ingredientsResult[0]
        : ingredientsResult.rows;

      for (const { ingredient_id, quantity, unit } of ingredients) {
        const traceableResult = await connection.query(
          "SELECT traceable FROM ingredients WHERE id = $1",
          [ingredient_id]
        );
        const traceableRows = Array.isArray(traceableResult)
          ? traceableResult[0]
          : traceableResult.rows;

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

        const updateResult = await connection.query(
          `UPDATE ingredients SET quantity = quantity - $1 WHERE id = $2 AND unit = $3 AND quantity >= $4`,
          [baseDeduct, ingredient_id, baseUnit, baseDeduct]
        );

        const affectedRows = Array.isArray(updateResult)
          ? updateResult[0].affectedRows
          : updateResult.rowCount;

        if (affectedRows === 0) {
          throw new Error(
            `Insufficient stock or unit mismatch for ingredient ID ${ingredient_id}`
          );
        }
      }
    }

    await connection.query("COMMIT");
    res.json({ success: true });
  } catch (error) {
    await connection.query("ROLLBACK");
    res.status(400).json({ error: error.message });
  } finally {
    connection.release();
  }
};
