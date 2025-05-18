import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import AddVisaForm from './AddVisaForm';
import AddAgentForm from './AddAgentForm';
import ViewMessages from './ViewMessages';

const AdminDashboard = () => {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-100 p-4 border-r">
        <h2 className="text-lg font-bold mb-4">Admin Panel</h2>
        <ul className="space-y-2">
          <li><Link to="add-visa" className="text-blue-600">➕ Add Visa</Link></li>
          <li><Link to="add-agent" className="text-blue-600">➕ Add Agent</Link></li>
          <li><Link to="messages" className="text-blue-600">📬 View Messages</Link></li>
          <li><button onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }} className="text-red-600 mt-4">🔒 Logout</button></li>
        </ul>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto">
        <Routes>
          <Route path="add-visa" element={<AddVisaForm />} />
          <Route path="add-agent" element={<AddAgentForm />} />
          <Route path="messages" element={<ViewMessages />} />
          <Route path="*" element={<p>Select an admin task from the sidebar.</p>} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
