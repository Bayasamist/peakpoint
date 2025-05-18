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
    <div className="max-w-md mx-auto border p-4 rounded shadow my-6">
      <h2 className="text-xl font-bold mb-4">Add New Visa Type</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="type"
          placeholder="Visa Type (e.g. Student Visa)"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="country"
          placeholder="Country (optional)"
          value={formData.country}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded h-24"
          required
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Add Visa
        </button>
        {status && <p className="text-sm mt-2">{status}</p>}
      </form>
    </div>
  );
};

export default AddVisaForm;
