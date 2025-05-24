import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const LoginForm = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        const decoded = jwtDecode(data.token);
        if (decoded.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setError('Network error');
    }
  };

  return (
    <div className="max-w-sm mx-auto px-6 py-10 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-xl text-white mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">🔐 Login</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          name="email"
          type="email"
          placeholder="Email address"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md"
        >
          🚪 Login
        </button>

        <p className="text-center text-sm text-gray-400 mt-4">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-400 hover:underline">
            Register here
          </a>
        </p>

        {error && <p className="text-red-400 text-sm mt-3 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
