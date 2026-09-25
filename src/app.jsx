import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Poem from './pages/Poem';
import './App.css'; // Add basic styling here if you have it

function App() {
  return (
    <Router>
      <div className="app-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'serif' }}>
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1>The Poetry Archive</h1>
        </header>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/poem/:id" element={<Poem />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;