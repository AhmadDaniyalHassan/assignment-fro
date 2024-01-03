// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className={`flex ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
        {isSidebarOpen && <Sidebar />}
        <div className="flex-1 p-4 bg-gray-200">
          <h1 className=' font-bold text-4xl mb-1'>CUSTOMERS</h1>
          <button className="text-white bg-green-800 p-2 " onClick={toggleSidebar}>
            {isSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
          </button>
          <Routes>
            <Route path="/" element={<Home />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
