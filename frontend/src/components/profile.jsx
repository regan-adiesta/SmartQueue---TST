import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import { db } from "../firebaseConfig.js";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Profile = (props) => {
  const { currentUser } = useAuth(); // Get the logged-in user
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    age: "",
    phone_number: "",
    special_condition: false,
  });

  // Fetch user profile data from Firestore
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (currentUser) {
          const userDoc = await getDoc(doc(db, "user", currentUser.uid));
          if (userDoc.exists()) {
            setFormData(userDoc.data());
          }
        }
      } catch (err) {
        console.error("Error fetching profile data:", err);
      }
    };
    fetchProfileData();
  }, [currentUser]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Save profile updates to Firestore
  const saveProfile = async () => {
    try {
      if (currentUser) {
        const userDoc = doc(db, "user", currentUser.uid);
        await setDoc(userDoc, formData, { merge: true });
        setEditing(false);
        console.log("Profile updated successfully");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
      <div id="services" className="text-center">
      <div className="container">
        <div className="section-title">
        <h1>Profile</h1>
    {currentUser ? (
      editing ? (
        <div>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone_number"
            placeholder="Phone Number"
            value={formData.phone_number}
            onChange={handleChange}
          />
          <label>
            <input
              type="checkbox"
              name="special_condition"
              checked={formData.special_condition}
              onChange={handleChange}
            />
            Special Condition
          </label>
          <button onClick={saveProfile} type="submit" className="btn btn-custom btn-lg">Save</button>
          <button onClick={() => setEditing(false)} type="reset" className="btn btn-custom btn-lg">Cancel</button>
        </div>
      ) : (
        <div>
          <p><strong>First Name:</strong> {formData.first_name || "Not provided"}</p>
          <p><strong>Last Name:</strong> {formData.last_name || "Not provided"}</p>
          <p><strong>Age:</strong> {formData.age || "Not provided"}</p>
          <p><strong>Phone Number:</strong> {formData.phone_number || "Not provided"}</p>
          <p>
            <strong>Special Condition:</strong>{" "}
            {formData.special_condition ? "Yes" : "No"}
          </p>
          <button onClick={() => setEditing(true)} type="submit" className="btn btn-custom btn-lg">Edit Profile</button>
        </div>
      )
    ) : (
      <p>Loading user data...</p>
    )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
