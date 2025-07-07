// routes/itemRoutes.js
const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController.js");

router.get("/", itemController.getAllItems);
router.get("/:id", itemController.getItemById);
router.post("/", itemController.addItem);
router.put("/:id", itemController.updateItem);
router.delete("/:id", itemController.deleteItem);

module.exports = router;
