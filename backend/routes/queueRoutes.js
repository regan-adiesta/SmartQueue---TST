import express from "express";
import { joinQueue, getQueueFromQueueModel, getUserPosition } from '../controllers/queueController.js'; // Correct import

const router = express.Router();

router.post("/join", joinQueue);
router.get("/queue", getQueueFromQueueModel);
router.get("/position/:userId", getUserPosition);

export default router;  // ES module export
