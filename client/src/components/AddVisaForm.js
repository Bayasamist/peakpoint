import React, { useState } from 'react';
import { createVisaType } from '../api/api';

const AddVisaForm = () => {
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    country: ''
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
      const data = await createVisaType(formData);
      if (data.message || data._id) {
        setStatus('✅ Visa type added!');
        setFormData({ type: '', description: '', country: '' });
      } else {
        setStatus(`❌ ${data.error || 'Error occurred'}`);
      }
    } catch (err) {
      console.error(err);
      setStatus('❌ Network error.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 rounded-2xl bg-gradient-to-br from-gray-800 via-gray-900 to-black border border-gray-700 shadow-xl text-white">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-center">
        ➕ Add New Visa Type
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 text-sm text-gray-300">Visa Type</label>
          <input
            type="text"
            name="type"
            placeholder="e.g. Student Visa"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-300">Country</label>
          <input
            type="text"
            name="country"
            placeholder="e.g. Australia"
            value={formData.country}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-300">Description</label>
          <textarea
            name="description"
            placeholder="Visa description..."
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-xl font-semibold text-white transition-all duration-300"
        >
          ✅ Add Visa
        </button>

        {status && (
          <p className="text-sm text-center mt-3 text-gray-300">{status}</p>
        )}
      </form>
    </div>
  );
};

export default AddVisaForm;
