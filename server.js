// server.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const updateRoutes = require("./routes/updateroutes");

const app = express();
connectDB();

// ensure uploads/ exists
fs.mkdirSync(path.join(__dirname, "uploads"), { recursive: true });

app.use(
  cors({
    origin: "http://localhost:3000", // your React dev server
  })
);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/updates", updateRoutes);

// basic health check
app.get("/", (_req, res) => res.send("Car Rada backend is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Car Rada backend on http://localhost:${PORT}`));
