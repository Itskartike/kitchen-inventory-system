const db = require("../models/db");

exports.getIngredients = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM ingredients");
    // Check if the result is an array (MySQL) or an object with a 'rows' property (PostgreSQL)
    const results = Array.isArray(result) ? result[0] : result.rows;
    const mappedResults = results.map((row) => ({
      ...row,
      expiryDate: row.expiry_date ? String(row.expiry_date).slice(0, 10) : "",
      threshold: row.threshold,
      traceable: row.traceable,
    }));
    res.json(mappedResults);
  } catch (err) {
    res.status(500).json({ error: { message: err.message, stack: err.stack } });
  }
};

exports.addIngredient = async (req, res) => {
  const ingredient = req.body;
  const status =
    ingredient.quantity === 0
      ? "Out of Stock"
      : ingredient.quantity <= 5
      ? "Low Stock"
      : "In Stock";

  const query = `
    INSERT INTO ingredients 
    (name, category, quantity, unit, price, supplier, location, expiry_date, status, threshold, traceable)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING id;
  `;
  const values = [
    ingredient.name,
    ingredient.category,
    ingredient.quantity,
    ingredient.unit,
    ingredient.price,
    ingredient.supplier,
    ingredient.location,
    ingredient.expiryDate,
    status,
    ingredient.threshold || 5,
    ingredient.traceable !== undefined ? ingredient.traceable : true,
  ];

  try {
    const result = await db.query(query, values);
    const newId = Array.isArray(result)
      ? result[0].insertId
      : result.rows[0].id;
    res.status(201).json({ id: newId, ...ingredient, status });
  } catch (err) {
    if (err.code === "23505") {
      // PostgreSQL duplicate key error code
      return res.status(409).json({
        error: {
          message: "Ingredient name already exists.",
          code: err.code,
        },
      });
    }
    return res
      .status(500)
      .json({ error: { message: err.message, code: err.code } });
  }
};

exports.updateIngredient = async (req, res) => {
  const { id } = req.params;
  const ingredient = req.body;
  const status =
    ingredient.quantity === 0
      ? "Out of Stock"
      : ingredient.quantity <= 5
      ? "Low Stock"
      : "In Stock";

  const query = `
    UPDATE ingredients SET 
      name = $1, category = $2, quantity = $3, unit = $4, price = $5, supplier = $6, 
      location = $7, expiry_date = $8, status = $9, threshold = $10, traceable = $11
    WHERE id = $12
  `;
  const values = [
    ingredient.name,
    ingredient.category,
    ingredient.quantity,
    ingredient.unit,
    ingredient.price,
    ingredient.supplier,
    ingredient.location,
    ingredient.expiryDate,
    status,
    ingredient.threshold || 5,
    ingredient.traceable !== undefined ? ingredient.traceable : true,
    id,
  ];

  try {
    await db.query(query, values);
    res.json({ id: Number(id), ...ingredient, status });
  } catch (err) {
    console.error("Update error:", err);
    return res
      .status(500)
      .json({ error: { message: err.message, stack: err.stack } });
  }
};

exports.deleteIngredient = async (req, res) => {
  try {
    await db.query("DELETE FROM ingredients WHERE id = $1", [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: { message: err.message, stack: err.stack } });
  }
};

exports.getUnits = (req, res) => {
  res.json([
    { name: "gm" },
    { name: "kg" },
    { name: "ml" },
    { name: "l" },
    { name: "piece" },
  ]);
};
