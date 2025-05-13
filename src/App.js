import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Register from './component/Register';
import Login from './component/Login';
import Dashboard from './component/Dashboard';
import About from './component/About';
import Posts from './component/Posts';
import Home from './component/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/posts" element={<Posts />} />
        <Route path="/dashboard/about" element={<About />} />
        <Route path="/dashboard/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
