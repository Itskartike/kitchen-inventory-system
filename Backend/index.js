require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "https://kitchen-inventory-app.onrender.com",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
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

// --- Serve React App for Production ---
// This should be placed after all your API routes.

// Serve static files from the React app's build directory
app.use(
  express.static(path.join(__dirname, "..", "cloud-kitchen-inventory", "build"))
);

// The "catchall" handler: for any request that doesn't
// match one of the API routes above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "cloud-kitchen-inventory", "build", "index.html")
  );
});
// --- End of React App Serving ---

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
