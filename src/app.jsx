import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Poem from './pages/Poem';
import './output.css'; // Importing the compiled Tailwind CSS

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/poem/:id" element={<Poem />} />
      </Routes>
    </Router>
  );
}