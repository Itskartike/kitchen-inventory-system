const express = require("express");
const router = express.Router();
const menuItemController = require("../controllers/menuItemController");

router.get("/menu-items", menuItemController.getMenuItems);
router.post("/menu-items", menuItemController.addMenuItem);
router.put("/menu-items/:id", menuItemController.updateMenuItem);
router.delete("/menu-items/:id", menuItemController.deleteMenuItem);
router.get("/menu-categories", menuItemController.getMenuCategories);

module.exports = router;
