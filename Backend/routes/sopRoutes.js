const express = require("express");
const router = express.Router();
const sopController = require("../controllers/sopController");

router.post("/recipesop/:menuItemId", sopController.createOrUpdateSOP);
router.get("/recipesop/:menuItemId", sopController.getSOP);

module.exports = router;
