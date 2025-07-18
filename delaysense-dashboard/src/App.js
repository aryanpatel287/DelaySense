import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Analytics from './pages/Analytics';
import SKUImpact from './pages/SKUImpact';
import Sugesstions from './pages/Sugesstions';
import Settings from './pages/Settings';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="app-root">
        <Sidebar />
        <div className="main-area">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/sku-impact" element={<SKUImpact />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/suggestion" element={<Sugesstions />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
