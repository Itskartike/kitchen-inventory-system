const db = require("../models/db.js");

// Get all items
exports.getAllItems = (req, res) => {
  db.query("SELECT * FROM items", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

// Get item by ID
exports.getItemById = (req, res) => {
  db.query(
    "SELECT * FROM items WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results[0]);
    }
  );
};

// Add new item
exports.addItem = (req, res) => {
  const { name, quantity, price } = req.body;
  db.query(
    "INSERT INTO items (name, quantity, price) VALUES (?, ?, ?)",
    [name, quantity, price],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id: result.insertId, name, quantity, price });
    }
  );
};

// Update item
exports.updateItem = (req, res) => {
  const { name, quantity, price } = req.body;
  db.query(
    "UPDATE items SET name=?, quantity=?, price=? WHERE id=?",
    [name, quantity, price, req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Item updated" });
    }
  );
};

// Delete item
exports.deleteItem = (req, res) => {
  db.query("DELETE FROM items WHERE id=?", [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Item deleted" });
  });
};
