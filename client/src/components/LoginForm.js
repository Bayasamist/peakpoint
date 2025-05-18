import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

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
        onLogin(); // Callback to refresh UI or redirect
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setError('Network error');
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4 border rounded my-6">
      <h2 className="text-xl font-bold mb-4">Admin Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
