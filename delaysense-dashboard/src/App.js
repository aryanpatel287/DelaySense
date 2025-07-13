import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="app-root">
      <Sidebar />
      <div className="main-area">
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
