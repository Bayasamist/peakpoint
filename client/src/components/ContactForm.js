import React, { useState } from 'react';
import { submitContactForm } from '../api/api';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const res = await submitContactForm(formData);
      if (res.message) {
        setStatus('✅ Message sent!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('❌ Something went wrong.');
      }
    } catch (err) {
      console.error(err);
      setStatus('❌ Could not send message.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow my-6">
      <h2 className="text-xl font-bold mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Your email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="message"
          placeholder="Your message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-2 border rounded h-24"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send
        </button>
        {status && <p className="text-sm mt-2">{status}</p>}
      </form>
    </div>
  );
};

export default ContactForm;
