import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Register() {
  const { username, setusername } = useState("");
  const { password, setpassword } = useState("");
  const { error, seterror } = useState("");
  const { navigate } = useNavigate("");
  const handleRegister = async (e) => {
    e.preventdefault();
    try {
      const res = await axios.post("https://localhost/api/user/register", {
        username,
        password,
      });
      if (res.status(201) || res.status(200)) {
        alert("succesful registered");
        navigate("/login");
      }
    } catch (err) {
      seterror("Username already exists. Please try again.");
    }
  };
}
return (
  <div>
    <h1>Register</h1>
    <form onSubmit={handleRegister}>
      <input
        type="text"
        value={username}
        onChange={(e) => setusername(e.target.value)}
        placeholder="USERNAME"
      />
      <input
        type="text"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
      />
      <button type="submit">SUBMIT</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  </div>
);
export default Register;
