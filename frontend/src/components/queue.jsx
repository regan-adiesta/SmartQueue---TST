import React, { useState, useEffect } from "react";
import { db, collection, addDoc, getDocs, query, orderBy } from "../firebaseConfig"; // Adjust path accordingly
import { useAuth } from "../contexts/authContext";

const Queue = (props) => {
  const [queue, setQueue] = useState([]);
  const [currentUserQueueNumber, setCurrentUserQueueNumber] = useState(null);
  const [estimatedWaitTime, setEstimatedWaitTime] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchQueueData();
  }, []);

  const fetchQueueData = async () => {
    try {
      const queueRef = collection(db, "queue");
      const q = query(queueRef, orderBy("priority"));
      const querySnapshot = await getDocs(q);
      const queueData = querySnapshot.docs.map((doc) => doc.data());
      setQueue(queueData);


      const userPosition = queueData.findIndex((user) => user.id === currentUser?.uid) + 1;
      setCurrentUserQueueNumber(userPosition);
      
    
      const waitTime = userPosition * 5; 
      setEstimatedWaitTime(waitTime);
    } catch (error) {
      console.error("Error fetching queue data:", error);
    }
  };

  const joinQueue = async () => {
    try {
      const userId = currentUser?.uid;
      const priorityValue = 1; 
      const queueRef = collection(db, "queue");

      const docRef = await addDoc(queueRef, {
        id: userId,
        name: currentUser?.displayName || "Unnamed User",
        priority: priorityValue,
      });

      console.log("User added to the queue with ID:", docRef.id);
      fetchQueueData(); 
    } catch (error) {
      console.error("Error joining queue:", error);
    }
  };

  return (
    <header id="Queue">
      <div className="queue">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1>{props.data ? props.data.title : "Administration Queue"}</h1>
                <button onClick={joinQueue} className="btn btn-custom btn-lg page-scroll">
                  Join Queue
                </button>
                {currentUserQueueNumber && (
                  <div>
                    <p>Your Queue Number: {currentUserQueueNumber}</p>
                    <p>Estimated Wait Time: {estimatedWaitTime} minutes</p>
                    <p>Your Position in Queue: {currentUserQueueNumber}</p>
                  </div>
                )}
                <h2>Current Queue</h2>
                <ul>
                  {queue.map((user, index) => (
                    <li key={index}>
                      Position {index + 1}: {user.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Queue;
