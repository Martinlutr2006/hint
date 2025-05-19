import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("worker");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/users/register", {
        username,
        password,
        role,
      });

      if (res.status === 201 || res.status === 200) {
        alert("Registration successful!");
        navigate("/login");
      }
    } catch (err) {
      alert("Username already exists or server error.");
    }
  };

  return (
    <div className="register">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label>USERNAME</label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
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
        <label>ROLE</label>
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="worker">Worker</option>
          <option value="employee">Employee</option>
        </select>
        <br />
        <button type="submit">Register</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
export default Register;
