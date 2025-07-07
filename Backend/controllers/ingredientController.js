const db = require("../models/db");

exports.getIngredients = async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM ingredients");
    const mappedResults = results.map((row) => ({
      ...row,
      expiryDate: row.expiry_date ? String(row.expiry_date).slice(0, 10) : "",
      threshold: row.threshold,
      traceable: row.traceable,
    }));
    res.json(mappedResults);
  } catch (err) {
    res.status(500).json({ error: err });
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
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
    const [result] = await db.query(query, values);
    res.status(201).json({ id: result.insertId, ...ingredient, status });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
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
      name = ?, category = ?, quantity = ?, unit = ?, price = ?, supplier = ?, 
      location = ?, expiry_date = ?, status = ?, threshold = ?, traceable = ?
    WHERE id = ?
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
    return res.status(500).json({ error: err });
  }
};

exports.deleteIngredient = async (req, res) => {
  try {
    await db.query("DELETE FROM ingredients WHERE id = ?", [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err });
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
