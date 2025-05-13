import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Posts from "./Posts";
import About from "./About";

function Dashboard() {
  return (
    <div>
      <nav style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <Link to="home">Home</Link>
        <Link to="posts">Posts</Link>
        <Link to="/Dashboard/about">About</Link>
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
