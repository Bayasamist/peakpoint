import React, { useState } from 'react';

const AddAgentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    agency: '',
    country: '',
    email: '',
    phone: '',
    description: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      setStatus('❌ You must be logged in.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('✅ Agent added successfully!');
        setFormData({
          name: '',
          agency: '',
          country: '',
          email: '',
          phone: '',
          description: ''
        });
      } else {
        setStatus(`❌ ${data.error || 'Error occurred'}`);
      }
    } catch (err) {
      console.error(err);
      setStatus('❌ Network error.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-10 px-6 py-8 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">Add New Agent</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {[
          { name: 'name', type: 'text', placeholder: 'Full Name', required: true },
          { name: 'agency', type: 'text', placeholder: 'Agency Name', required: true },
          { name: 'country', type: 'text', placeholder: 'Country' },
          { name: 'email', type: 'email', placeholder: 'Email' },
          { name: 'phone', type: 'text', placeholder: 'Phone Number' },
        ].map(({ name, type, placeholder, required }) => (
          <input
            key={name}
            name={name}
            type={type}
            placeholder={placeholder}
            required={required}
            value={formData[name]}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        ))}

        <textarea
          name="description"
          placeholder="Short Description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg"
        >
          ➕ Add Agent
        </button>

        {status && (
          <p className="text-sm text-center mt-4 text-gray-300">{status}</p>
        )}
      </form>
    </div>
  );
};

export default AddAgentForm;
