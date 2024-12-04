// routes/queueRoutes.js
const express = require("express");
const { getQueues, addQueue, deleteQueue } = require("../controllers/queueController");
const router = express.Router();

router.get("/", getQueues);
router.post("/", addQueue);
router.delete("/:id", deleteQueue);

module.exports = router;
