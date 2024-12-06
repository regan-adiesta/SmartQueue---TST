import React from "react";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
  
    const handleLogout = async () => {
      try {
        await logout();
        alert("You have logged out.");
        navigate("/login");
      } catch (err) {
        console.error("Failed to log out:", err);
      }
    };
  
    return (
      <div>
        <h1>Dashboard</h1>
        {currentUser ? (
          <div>
            <p>Welcome, {currentUser.email}!</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <p>You are not logged in.</p>
            <button onClick={() => navigate("/login")}>Login</button>
          </div>
        )}
        {/* Additional Dashboard content */}
      </div>
    );
  };
  
  export default Dashboard;
