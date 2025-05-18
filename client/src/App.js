import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import VisaList from './components/VisaList';
import AgentList from './components/AgentList';
import ContactForm from './components/ContactForm';
import AddVisaForm from './components/AddVisaForm';
import AddAgentForm from './components/AddAgentForm';
import AdminDashboard from './components/AdminDashboard';
import LoginPage from './LoginPage';
import UserApplicationForm from './components/UserApplicationForm';
import { isTokenValid } from './utils/auth';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import VisaRecommendationForm from './components/VisaRecommendationForm';
import logo from './assets/channels4_profile.jpg';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTokenValid()) {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
      }
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.href = '/login';
  };

  return (
    <Router>
      {/* Navbar */}
      <nav className="bg-white border-b shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <NavLink to="/" className="flex items-center space-x-2">
            <img src={logo} alt="VisaGuide Logo" className="w-10 h-10 rounded-full object-cover" />
            <span className="text-xl font-bold text-blue-700">VisaGuide</span>
          </NavLink>

          <button
            className="sm:hidden text-gray-700 text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>

          <div className={`sm:flex sm:space-x-4 ${isMenuOpen ? 'block mt-4' : 'hidden sm:flex'}`}>
            {[
              { path: '/visas', label: 'Visas' },
              { path: '/agents', label: 'Agents' },
              { path: '/contact', label: 'Contact' },
              { path: '/apply', label: 'Apply' },
              { path: '/recommend', label: 'Find My Visa' },
            ].map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `block font-medium transition ${
                    isActive ? 'text-blue-800 underline' : 'text-blue-600 hover:text-blue-800'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}

            {isLoggedIn ? (
              <>
                <NavLink to="/admin" className="block text-blue-600 hover:text-blue-800 transition font-medium">Dashboard</NavLink>
                <NavLink to="/admin/add-agent" className="block text-blue-600 hover:text-blue-800 transition font-medium">Add Agent</NavLink>
                <NavLink to="/admin/add-visa" className="block text-blue-600 hover:text-blue-800 transition font-medium">Add Visa</NavLink>
                <button onClick={handleLogout} className="block text-red-600 hover:text-red-800 transition font-medium">Logout</button>
              </>
            ) : (
              <NavLink to="/login" className="block text-blue-600 hover:text-blue-800 transition font-medium">Login</NavLink>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 pb-10 pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/visas" element={<VisaList />} />
          <Route path="/agents" element={<AgentList />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/apply" element={<UserApplicationForm />} />
          <Route path="/recommend" element={<VisaRecommendationForm />} />
          <Route path="/login" element={<LoginPage />} />
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

      {/* Footer */}
     <footer className="bg-gray-100 text-center text-sm text-gray-600 py-4 border-t">
  <p className="mb-1">&copy; {new Date().getFullYear()} VisaGuide. All rights reserved.</p>
  <a
    href="https://www.youtube.com/@Maa_Medias"
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 hover:underline"
  >
    📺 Watch us on YouTube: @Maa_Medias
  </a>
</footer>
    </Router>
  );
}

export default App;
