const express = require("express");
const router = express.Router();
const ingredientController = require("../controllers/ingredientController");

router.get("/ingredients", ingredientController.getIngredients);
router.post("/ingredients", ingredientController.addIngredient);
router.put("/ingredients/:id", ingredientController.updateIngredient);
router.delete("/ingredients/:id", ingredientController.deleteIngredient);
router.get("/units", ingredientController.getUnits);

module.exports = router;
