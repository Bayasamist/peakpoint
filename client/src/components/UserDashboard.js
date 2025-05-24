import React from 'react';

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          👤 User Dashboard
        </h1>
        <p className="text-lg text-gray-300 mb-4 text-center">
          Welcome to your personal visa dashboard. Here you can track your application status, update your profile, and explore recommended visa types.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <div className="p-6 bg-gray-800 rounded-xl border border-gray-700 shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2 text-purple-300">📝 My Applications</h2>
            <p className="text-gray-400">View your submitted applications and check their current status.</p>
            <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition">View Applications</button>
          </div>

          <div className="p-6 bg-gray-800 rounded-xl border border-gray-700 shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2 text-blue-300">🎯 Visa Suggestions</h2>
            <p className="text-gray-400">Get AI-based visa recommendations based on your background.</p>
            <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition">Find My Visa</button>
          </div>

          <div className="p-6 bg-gray-800 rounded-xl border border-gray-700 shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2 text-green-300">📁 My Profile</h2>
            <p className="text-gray-400">Update your personal information and documents.</p>
            <button className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition">Edit Profile</button>
          </div>

          <div className="p-6 bg-gray-800 rounded-xl border border-gray-700 shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2 text-red-300">🚪 Logout</h2>
            <p className="text-gray-400">End your session securely.</p>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                window.location.href = '/login';
              }}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
