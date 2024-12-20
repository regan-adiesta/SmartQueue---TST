// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const queueRoutes = require("./routes/queueRoutes");
const { verifyToken } = require("./controllers/authController");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Public routes
app.get("/", (req, res) => res.send("Smart Queue API"));

// Protected routes
app.use("/api/queues", verifyToken, queueRoutes);

module.exports = app;
