import React from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Home";
import Posts from "./Posts";
import About from "./About";
import ContactForm from "./ContactForm";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    alert("You have been logged out.");
    navigate("/login");
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <nav style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <Link to="home">Home</Link>
        <Link to="posts">Posts</Link>
        <Link to="about">About</Link>
        <Link to="contact">Contact</Link>
        <button onClick={handleLogout}>Logout</button>
      </nav>

      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="posts" element={<Posts />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<ContactForm />} />
      </Routes>
    </div>
  );
}

export default Dashboard;
