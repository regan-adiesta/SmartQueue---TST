// Add a user to the queue
app.post("/queue", async (req, res) => {
    const { userId, priority = 0 } = req.body;
    try {
      const queueRef = db.collection("queues");
      const docRef = await queueRef.add({
        userId,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        priority,
        status: "waiting",
      });
      res.send({ message: "User added to queue", queueId: docRef.id });
    } catch (error) {
      res.status(500).send({ error: "Failed to add user to queue" });
    }
  });
  
  // Get the current queue
  app.get("/queue", async (req, res) => {
    try {
      const snapshot = await db
        .collection("queues")
        .where("status", "==", "waiting")
        .orderBy("priority", "desc")
        .orderBy("timestamp", "asc")
        .get();
  
      const queue = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.send(queue);
    } catch (error) {
      res.status(500).send({ error: "Failed to fetch queue" });
    }
  });
  
  // Remove a user from the queue
  app.delete("/queue/:queueId", async (req, res) => {
    const { queueId } = req.params;
    try {
      await db.collection("queues").doc(queueId).update({ status: "served" });
      res.send({ message: "User removed from queue" });
    } catch (error) {
      res.status(500).send({ error: "Failed to remove user from queue" });
    }
  });
  
  // Predict wait time using AI
  app.get("/queue/wait-time", async (req, res) => {
    try {
      const snapshot = await db.collection("queues").get();
      const queue = snapshot.docs.map((doc) => doc.data());
  
      // Mock AI model for prediction
      const waitTime = queue.length * 5; // Assume 5 minutes per user
      res.send({ estimatedWaitTime: `${waitTime} minutes` });
    } catch (error) {
      res.status(500).send({ error: "Failed to calculate wait time" });
    }
  });
  