import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Posts from "./Posts";
import About from "./About";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
   const handleLogout = () => {
    // Remove user data from localStorage
    localStorage.removeItem('user');

    // Optional: Show alert
    alert('You have been logged out.');

    // Redirect to login page
    navigate('/login');
  };
  return (
    <div>
      <nav style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <Link to="home">Home</Link>
        <Link to="posts">Posts</Link>
        <Link to="/Dashboard/about">About</Link>
         <button onClick={handleLogout}>Logout</button>
      </nav>

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/Posts" element={<Posts />} />
        <Route path="/Dashboard/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default Dashboard;
