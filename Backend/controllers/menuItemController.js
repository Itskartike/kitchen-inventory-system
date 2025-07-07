const db = require("../models/db");

exports.getMenuItems = async (req, res) => {
  try {
    const [results] = await db.query(`
      SELECT mi.id, mi.name, mc.name AS category, mi.price, mi.status, mi.created_at, mi.updated_at
      FROM menu_items mi
      LEFT JOIN menu_categories mc ON mi.category_id = mc.id
      ORDER BY mi.id DESC
    `);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.addMenuItem = async (req, res) => {
  const { name, category, price, status } = req.body;
  try {
    const [catResults] = await db.query(
      "SELECT id FROM menu_categories WHERE name = ?",
      [category]
    );
    if (catResults.length === 0) {
      return res.status(400).json({ error: "Invalid category" });
    }
    const category_id = catResults[0].id;
    const [result] = await db.query(
      "INSERT INTO menu_items (name, category_id, price, status) VALUES (?, ?, ?, ?)",
      [name, category_id, price, status]
    );
    res.status(201).json({
      id: result.insertId,
      name,
      category,
      price,
      status,
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.updateMenuItem = async (req, res) => {
  const { id } = req.params;
  const { name, category, price, status } = req.body;
  try {
    const [catResults] = await db.query(
      "SELECT id FROM menu_categories WHERE name = ?",
      [category]
    );
    if (catResults.length === 0) {
      return res.status(400).json({ error: "Invalid category" });
    }
    const category_id = catResults[0].id;
    await db.query(
      "UPDATE menu_items SET name = ?, category_id = ?, price = ?, status = ? WHERE id = ?",
      [name, category_id, price, status, id]
    );
    res.json({ id: Number(id), name, category, price, status });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.deleteMenuItem = async (req, res) => {
  try {
    await db.query("DELETE FROM menu_items WHERE id = ?", [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.getMenuCategories = async (req, res) => {
  try {
    const [results] = await db.query(
      "SELECT name FROM menu_categories ORDER BY name"
    );
    res.json(results.map((r) => r.name));
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
