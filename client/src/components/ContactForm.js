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
    <div className="max-w-xl mx-auto p-6 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl shadow-xl border border-gray-700 mt-10">
      <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        📬 Contact Us
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          name="name"
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message..."
          value={formData.message}
          onChange={handleChange}
          rows="5"
          className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
        >
          Send Message
        </button>
        {status && (
          <p className={`text-sm mt-3 ${status.includes('✅') ? 'text-green-400' : 'text-red-400'}`}>
            {status}
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
