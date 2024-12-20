import React, { useState } from "react";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    age: "",
    phone_number: "",
    specialCondition: false,
    password: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
  
    try {
      const { email, password, first_name, last_name, age, phone_number, specialCondition } = formData;
      if (!age || isNaN(parseInt(age, 10))) throw new Error("Please enter a valid age.");
      if (!phone_number || isNaN(parseInt(phone_number, 10)))
        throw new Error("Please enter a valid phone number.");
  
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;
  
      await setDoc(doc(db, "user", userId), {
        first_name,
        last_name,
        email,
        age: parseInt(age, 1), 
        phone_number: parseInt(phone_number, 1), 
        special_condition: specialCondition,
        userId,
      });
  
      alert("Registration Successful");
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Error: " + error.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
          required
        />
        <label>
          <input
            type="checkbox"
            name="specialCondition"
            checked={formData.specialCondition}
            onChange={handleChange}
          />
          Special Condition
        </label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
