let queue = [];

exports.addUserToQueue = (userId) => {
  const queueNumber = queue.length + 1;
  queue.push({ userId, queueNumber });
  return { queueNumber, estimatedWaitTime: queueNumber * 5 }; // Example: 5 minutes per user
};

exports.getQueue = () => {
  return queue;
};