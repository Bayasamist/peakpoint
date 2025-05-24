import React, { useState } from 'react';

const RegistrationForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');

    if (form.password !== form.confirmPassword) {
      setStatus('❌ Passwords do not match');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password
        })
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('✅ Registration successful. You can now log in.');
        setForm({ name: '', email: '', password: '', confirmPassword: '' });
      } else {
        setStatus(`❌ ${data.error || 'Something went wrong'}`);
      }
    } catch (err) {
      console.error(err);
      setStatus('❌ Network error');
    }
  };

  return (
    <div className="max-w-sm mx-auto px-6 py-10 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-xl text-white mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">📝 Register</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg placeholder-gray-400"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email address"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg placeholder-gray-400"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg placeholder-gray-400"
          required
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg placeholder-gray-400"
          required
        />
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-teal-700 transition-all duration-300 shadow-md"
        >
          ✅ Register
        </button>
        {status && <p className="text-sm mt-3 text-center text-red-400">{status}</p>}
      </form>
    </div>
  );
};

export default RegistrationForm;
