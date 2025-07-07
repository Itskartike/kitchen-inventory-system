const express = require("express");
const router = express.Router();
const menuItemIngredientController = require("../controllers/menuItemIngredientController");

router.post(
  "/menu-item-ingredients",
  menuItemIngredientController.addMenuItemIngredient
);

module.exports = router;
