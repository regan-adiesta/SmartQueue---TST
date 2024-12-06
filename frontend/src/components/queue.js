import React, { useState, useEffect } from "react";

function Queue() {
    const [queues, setQueues] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/queues", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => setQueues(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div>
            <h2>Queue List</h2>
            <ul>
                {queues.map((queue) => (
                    <li key={queue.id}>
                        {queue.name} (Priority: {queue.priority})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Queue;
