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
import RegistrationForm from './components/RegistrationForm';
import UserDashboard from './components/UserDashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    const interval = setInterval(() => {
      if (!isTokenValid()) {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
      }
    }, 60 * 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.href = '/login';
  };

  const publicNavItems = [
    { path: '/visas', label: 'Visas', icon: '🛂' },
    { path: '/agents', label: 'Agents', icon: '👥' },
    { path: '/contact', label: 'Contact', icon: '💬' },
    { path: '/apply', label: 'Apply', icon: '📝' },
    { path: '/recommend', label: 'Find My Visa', icon: '🎯', highlight: true },
    { path: '/user/dashboard', label: 'User Dashboard', icon: '👤' },
  ];

  const adminNavItems = [
    { path: '/admin', label: 'Dashboard', icon: '📊' },
    { path: '/admin/add-agent', label: 'Add Agent', icon: '➕' },
    { path: '/admin/add-visa', label: 'Add Visa', icon: '📋' },
  ];

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white">
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50 shadow-2xl' : 'bg-transparent'}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-pink-900/10 to-blue-900/10 opacity-50"></div>

          <div className="relative max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <NavLink to="/" className="group flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
                <div className="relative">
                  <img src={logo} alt="VisaGuide Logo" className="w-12 h-12 rounded-2xl object-cover ring-2 ring-purple-500/50 group-hover:ring-purple-400 transition-all duration-300" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  VisaGuide
                </span>
              </NavLink>

              <div className="hidden lg:flex items-center space-x-1">
                {publicNavItems.map(({ path, label, icon, highlight }) => (
                  <NavLink
                    key={path}
                    to={path}
                    className={({ isActive }) =>
                      `group relative px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                        isActive ? 'text-white bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm' :
                        highlight ? 'text-white hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 bg-gradient-to-r from-purple-600/10 to-pink-600/10' :
                        'text-gray-300 hover:text-white hover:bg-white/10'
                      }`
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{icon}</span>
                      <span>{label}</span>
                    </div>
                    {highlight && <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>}
                  </NavLink>
                ))}

                <div className="flex items-center space-x-1 ml-6 pl-6 border-l border-gray-700/50">
                  {isLoggedIn ? (
                    <>
                      {adminNavItems.map(({ path, label, icon }) => (
                        <NavLink
                          key={path}
                          to={path}
                          className={({ isActive }) =>
                            `group px-3 py-2 rounded-xl font-medium transition-all duration-300 ${
                              isActive ? 'text-white bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-sm' :
                              'text-gray-300 hover:text-white hover:bg-white/10'
                            }`
                          }
                        >
                          <div className="flex items-center space-x-2">
                            <span className="text-sm">{icon}</span>
                            <span className="text-sm">{label}</span>
                          </div>
                        </NavLink>
                      ))}
                      <button onClick={handleLogout} className="group px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl font-medium transition-all duration-300">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">🚪</span>
                          <span>Logout</span>
                        </div>
                      </button>
                    </>
                  ) : (
                    <NavLink to="/login" className="group px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">🔑</span>
                        <span>Login</span>
                      </div>
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 pb-10 pt-28 animate-fade-in">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/visas" element={<VisaList />} />
            <Route path="/agents" element={<AgentList />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/apply" element={<UserApplicationForm />} />
            <Route path="/recommend" element={<VisaRecommendationForm />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/admin/add-visa" element={<ProtectedRoute><AddVisaForm /></ProtectedRoute>} />
            <Route path="/admin/add-agent" element={<ProtectedRoute><AddAgentForm /></ProtectedRoute>} />
            <Route path="/admin/*" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/user/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
          </Routes>
        </div>

        <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-center text-sm text-gray-400 py-6 border-t border-gray-700">
          <p className="mb-1">&copy; {new Date().getFullYear()} VisaGuide. All rights reserved.</p>
          <a href="https://www.youtube.com/@Maa_Medias" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-pink-400 transition">
            📺 Watch us on YouTube: @Maa_Medias
          </a>
        </footer>

        <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 1s ease-out;
          }
        `}</style>
      </div>
    </Router>
  );
}

export default App;
