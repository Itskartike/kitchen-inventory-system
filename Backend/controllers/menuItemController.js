const db = require("../models/db");

exports.getMenuItems = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT mi.id, mi.name, mc.name AS category, mi.price, mi.status, mi.created_at, mi.updated_at
      FROM menu_items mi
      LEFT JOIN menu_categories mc ON mi.category_id = mc.id
      ORDER BY mi.id DESC
    `);
    const results = Array.isArray(result) ? result[0] : result.rows;
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: { message: err.message, stack: err.stack } });
  }
};

exports.addMenuItem = async (req, res) => {
  const { name, category, price, status } = req.body;
  try {
    const catResult = await db.query(
      "SELECT id FROM menu_categories WHERE name = $1",
      [category]
    );
    const catResults = Array.isArray(catResult) ? catResult[0] : catResult.rows;
    if (catResults.length === 0) {
      return res.status(400).json({ error: "Invalid category" });
    }
    const category_id = catResults[0].id;
    const result = await db.query(
      "INSERT INTO menu_items (name, category_id, price, status) VALUES ($1, $2, $3, $4) RETURNING id",
      [name, category_id, price, status]
    );
    const newId = Array.isArray(result)
      ? result[0].insertId
      : result.rows[0].id;
    res.status(201).json({
      id: newId,
      name,
      category,
      price,
      status,
    });
  } catch (err) {
    res.status(500).json({ error: { message: err.message, stack: err.stack } });
  }
};

exports.updateMenuItem = async (req, res) => {
  const { id } = req.params;
  const { name, category, price, status } = req.body;
  try {
    const catResult = await db.query(
      "SELECT id FROM menu_categories WHERE name = $1",
      [category]
    );
    const catResults = Array.isArray(catResult) ? catResult[0] : catResult.rows;
    if (catResults.length === 0) {
      return res.status(400).json({ error: "Invalid category" });
    }
    const category_id = catResults[0].id;
    await db.query(
      "UPDATE menu_items SET name = $1, category_id = $2, price = $3, status = $4 WHERE id = $5",
      [name, category_id, price, status, id]
    );
    res.json({ id: Number(id), name, category, price, status });
  } catch (err) {
    res.status(500).json({ error: { message: err.message, stack: err.stack } });
  }
};

exports.deleteMenuItem = async (req, res) => {
  try {
    await db.query("DELETE FROM menu_items WHERE id = $1", [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: { message: err.message, stack: err.stack } });
  }
};

exports.getMenuCategories = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT name FROM menu_categories ORDER BY name"
    );
    const results = Array.isArray(result) ? result[0] : result.rows;
    res.json(results.map((r) => r.name));
  } catch (err) {
    res.status(500).json({ error: { message: err.message, stack: err.stack } });
  }
};
