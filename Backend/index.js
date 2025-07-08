require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const isProduction = process.env.NODE_ENV === "production";
const allowedOrigins = isProduction
  ? ["https://kitchen-inventory-system-p9v9.onrender.com"] // Your production frontend URL
  : ["http://localhost:3000"]; // Your local frontend URL

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());

// --- Modular route imports ---
const sopRoutes = require("./routes/sopRoutes");
const orderRoutes = require("./routes/orderRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");
const ingredientRoutes = require("./routes/ingredientRoutes");
const menuItemIngredientRoutes = require("./routes/menuItemIngredientRoutes");

// --- Use modular routes ---
app.use("/", sopRoutes);
app.use("/", orderRoutes);
app.use("/", menuItemRoutes);
app.use("/", ingredientRoutes);
app.use("/", menuItemIngredientRoutes);

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
