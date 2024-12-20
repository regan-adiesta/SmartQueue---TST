
import { Queue } from "../models/queueModel.js";

export const joinQueue = async (req, res) => {
    const { userId, priorityValue } = req.body;
  
    try {
      Queue.push({ userId, priorityValue, position: Queue.length + 1 });
      res.status(200).json({ message: "Successfully joined the queue!" });
    } catch (error) {
      console.error("Error adding to queue:", error);
      res.status(500).json({ error: "Failed to join queue." });
    }
  };
  
  export const getQueueFromQueueModel = async (req, res) => {
    try {
      const queue = await Queue.getQueue();
      res.status(200).json(queue);
    } catch (error) {
      console.error("Error retrieving queue:", error);
      res.status(500).json({ error: "Failed to retrieve queue." });
    }
  };
  
  export const getUserPosition = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const queue = await Queue.getQueue();
      const user = queue.find((entry) => entry.userId === userId);
  
      if (!user) {
        return res.status(404).json({ error: "User not found in queue." });
      }
  
      const estimatedWaitTime = user.position * 5; 
      res.status(200).json({ position: user.position, estimatedWaitTime });
    } catch (error) {
      console.error("Error finding user position:", error);
      res.status(500).json({ error: "Failed to retrieve user position." });
    }
  };
  