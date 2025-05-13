import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";
function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/users/register", {
        username,
        password,
      });

      if (res.status === 201 || res.status === 200) {
        alert("Registration successful!");
        navigate("/login");
      }
    } catch (err) {
      setError("Username already exists. Please try again.");
    }
  };

  return (
    <div className="register">
      <div className="header">
        <h2>Register</h2>
      </div>
      <form onSubmit={handleRegister}>
        <label>USERNAME</label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required8
        />
        <br />
        <label>PASSWORD</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Register</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default Register;
