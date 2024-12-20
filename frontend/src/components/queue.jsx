import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/authContext";

const Queue = () => {
  const [queue, setQueue] = useState([]);
  const [currentUserQueueNumber, setCurrentUserQueueNumber] = useState(null);
  const [estimatedWaitTime, setEstimatedWaitTime] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchQueueData();
  }, []);

  const fetchQueueData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/queue");
      setQueue(response.data.queue);
    } catch (error) {
      console.error("Error fetching queue data:", error);
    }
  };

  const joinQueue = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/queue/join", {
        userId: 'exampleUserId',
        priorityValue: 1, // Adjust accordingly
      });
      console.log(response.data); // Log response from backend
    } catch (error) {
      console.error("Error joining queue:", error);
    }
  };
  const userPosition = queue.findIndex((user) => user.id === currentUser?.uid) + 1;

  return (
    <div>
      <h1>Queue Page</h1>
      <button onClick={joinQueue}>Join Queue</button>
      {currentUserQueueNumber && (
        <div>
          <p>Your Queue Number: {currentUserQueueNumber}</p>
          <p>Estimated Wait Time: {estimatedWaitTime} minutes</p>
          <p>Your Position in Queue: {userPosition}</p>
        </div>
      )}
      <h2>Current Queue</h2>
      <ul>
        {queue.map((user, index) => (
          <li key={index}>Position {index + 1}: {user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Queue;