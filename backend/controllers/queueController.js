const { Queue, queues } = require("../models/queueModel");

const getQueues = (req, res) => {
    res.json(queues);
};

const addQueue = (req, res) => {
    const { name, priority } = req.body;
    const newQueue = new Queue(name, priority);
    queues.push(newQueue);
    res.status(201).json(newQueue);
};

const deleteQueue = (req, res) => {
    const { id } = req.params;
    const index = queues.findIndex((queue) => queue.id === id);
    if (index > -1) {
        queues.splice(index, 1);
        res.status(200).json({ message: "Queue deleted successfully" });
    } else {
        res.status(404).json({ message: "Queue not found" });
    }
};

module.exports = { getQueues, addQueue, deleteQueue };