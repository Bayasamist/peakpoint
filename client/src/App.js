import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import VisaList from './components/VisaList';
import AgentList from './components/AgentList';
import ContactForm from './components/ContactForm';
import AddVisaForm from './components/AddVisaForm';
import AddAgentForm from './components/AddAgentForm';
import AdminDashboard from './components/AdminDashboard';
import LoginPage from './LoginPage';
import { isTokenValid } from './utils/auth';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid());

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTokenValid()) {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
      }
    }, 60 * 1000); // check every 1 min

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.href = '/login';
  };

  return (
    <Router>
      <div className="max-w-4xl mx-auto p-4">
        <nav className="flex justify-between mb-6">
          <Link to="/" className="font-bold">VisaGuide</Link>
          <div className="space-x-4">
            <Link to="/visas" className="text-blue-600">Visas</Link>
            <Link to="/agents" className="text-blue-600">Agents</Link>
            <Link to="/contact" className="text-blue-600">Contact</Link>

            {isLoggedIn ? (
              <>
                <Link to="/admin/add-agent" className="text-blue-600">Add Agent</Link>
                <Link to="/admin/add-visa" className="text-blue-600">Add Visa</Link>
                <Link to="/admin" className="text-blue-600">Dashboard</Link>
                <button onClick={handleLogout} className="text-red-600">Logout</button>
              </>
            ) : (
              <Link to="/login" className="text-blue-600">Admin</Link>
            )}
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<h2 className="text-xl">Welcome to Visa Guide</h2>} />
          <Route path="/visas" element={<VisaList />} />
          <Route path="/agents" element={<AgentList />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/login" element={<LoginPage />} />

          {/* 🔐 Admin protected routes */}
          <Route
            path="/admin/add-visa"
            element={
              <ProtectedRoute>
                <AddVisaForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-agent"
            element={
              <ProtectedRoute>
                <AddAgentForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
