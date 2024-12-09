import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [isRegister, setIsRegister] = useState(false); // Toggle between login and register
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(""); // Clear any previous errors
      try {
        if (isRegister) {
          // Register new user
          await createUserWithEmailAndPassword(auth, email, password);
          alert("Registration successful! You can now log in.");
          setIsRegister(false); // Redirect to login form after successful registration
        } else {
          // Log in existing user
          await signInWithEmailAndPassword(auth, email, password);
          navigate("/"); // Redirect to dashboard
        }
      } catch (err) {
        setError(err.message);
      }
    };
  
    return (
      <div style={containerStyle}>
        <h2>{isRegister ? "Register" : "Login"}</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            {isRegister ? "Register" : "Login"}
          </button>
        </form>
        <p style={{ marginTop: "10px" }}>
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={() => setIsRegister(!isRegister)}
            style={{ color: "blue", cursor: "pointer" }}
          >
            {isRegister ? "Log in" : "Register"}
          </span>
        </p>
      </div>
    );
  };
  
  const containerStyle = {
    textAlign: "center",
    padding: "20px",
  };
  
  const formStyle = {
    display: "inline-block",
    textAlign: "left",
    width: "300px",
  };
  
  const inputStyle = {
    width: "100%",
    marginBottom: "10px",
    padding: "8px",
    fontSize: "16px",
  };
  
  const buttonStyle = {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
  };
  
  export default Login;