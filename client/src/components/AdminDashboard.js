import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import AddVisaForm from './AddVisaForm';
import AddAgentForm from './AddAgentForm';
import ViewMessages from './ViewMessages';

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 border-r border-gray-700 p-6 flex flex-col space-y-4 shadow-lg">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
          ⚙️ Admin Panel
        </h2>
        <nav className="flex flex-col space-y-2 text-sm font-medium">
          <Link
            to="add-visa"
            className="px-3 py-2 rounded-lg hover:bg-purple-600/20 transition text-purple-300 hover:text-white"
          >
            ➕ Add Visa
          </Link>
          <Link
            to="add-agent"
            className="px-3 py-2 rounded-lg hover:bg-purple-600/20 transition text-purple-300 hover:text-white"
          >
            ➕ Add Agent
          </Link>
          <Link
            to="messages"
            className="px-3 py-2 rounded-lg hover:bg-purple-600/20 transition text-purple-300 hover:text-white"
          >
            📬 View Messages
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login';
            }}
            className="mt-8 px-3 py-2 bg-red-600/20 hover:bg-red-600/40 text-red-300 hover:text-white rounded-lg transition"
          >
            🔒 Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <Routes>
          <Route path="add-visa" element={<AddVisaForm />} />
          <Route path="add-agent" element={<AddAgentForm />} />
          <Route path="messages" element={<ViewMessages />} />
          <Route
            path="*"
            element={
              <div className="text-gray-300 text-center mt-10">
                <p className="text-xl">📋 Select an admin task from the sidebar.</p>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
