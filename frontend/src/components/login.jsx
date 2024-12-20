import React, { useState } from "react";
import { auth, db } from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState(""); // For registration
  const [lastName, setLastName] = useState(""); // For registration
  const [age, setAge] = useState("");
  const [phone_number, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      if (isRegister) {

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const userId = userCredential.user.uid;


        await setDoc(doc(db, "user", userId), {
          first_name: firstName,
          last_name: lastName,
          email,
          userId,
        });

        alert("Registration successful! You can now log in.");
        setIsRegister(false); 
      } else {
        // Log in the user
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/"); 
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
        {isRegister && (
          <>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Phone"
              value={phone_number}
              onChange={(e) => setPhone(e.target.value)}
              style={inputStyle}
            />
          </>
          
        )}
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
