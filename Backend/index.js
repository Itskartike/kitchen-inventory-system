require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = process.env.PORT || 5000;

// MySQL connection pool
const db = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("DB Connection Error:", err);
    return;
  }
  console.log("Connected to MySQL");
  connection.release();
});

// CORS configuration
const isProduction = process.env.NODE_ENV === "production";
const allowedOrigins = isProduction
  ? ["YOUR_PRODUCTION_FRONTEND_URL"] // Replace with your actual frontend URL
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
