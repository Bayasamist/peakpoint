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
        setStatus('✅ Agent added!');
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
    <div className="max-w-md mx-auto border p-4 rounded shadow my-6">
      <h2 className="text-xl font-bold mb-4">Add New Agent</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="agency" placeholder="Agency" value={formData.agency} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="country" placeholder="Country" value={formData.country} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded" />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded h-20" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Add Agent
        </button>
        {status && <p className="text-sm mt-2">{status}</p>}
      </form>
    </div>
  );
};

export default AddAgentForm;
