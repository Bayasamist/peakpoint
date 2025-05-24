import React, { useState } from 'react';

const UserApplicationForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    education: '',
    experience: '',
    country: '',
    visaType: '',
    message: ''
  });

  const [passportImage, setPassportImage] = useState(null);
  const [ieltsFile, setIeltsFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.name === 'passportImage') {
      setPassportImage(e.target.files[0]);
    } else if (e.target.name === 'ieltsFile') {
      setIeltsFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (passportImage) formData.append('passportImage', passportImage);
    if (ieltsFile) formData.append('ieltsFile', ieltsFile);

    try {
      const res = await fetch('http://localhost:5000/api/user-application', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (res.ok) {
        setStatus('✅ Application submitted!');
        setForm({
          name: '', email: '', phone: '', education: '',
          experience: '', country: '', visaType: '', message: ''
        });
        setPassportImage(null);
        setIeltsFile(null);
      } else {
        setStatus(`❌ ${data.error || 'Submission failed.'}`);
      }
    } catch (err) {
      console.error(err);
      setStatus('❌ Network error');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-xl text-white mt-10">
      <h2 className="text-3xl font-bold mb-8 text-center">Study / Immigration Application</h2>
      <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
        {[
          { name: 'name', placeholder: 'Full Name', type: 'text', required: true },
          { name: 'email', placeholder: 'Email', type: 'email', required: true },
          { name: 'phone', placeholder: 'Phone Number', type: 'text' },
          { name: 'country', placeholder: 'Preferred Country', type: 'text' },
          { name: 'visaType', placeholder: 'Visa Type (e.g. Student, PR)', type: 'text' },
        ].map(({ name, type, placeholder, required }) => (
          <input
            key={name}
            name={name}
            type={type}
            placeholder={placeholder}
            value={form[name]}
            required={required}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
          />
        ))}

        {[
          { name: 'education', placeholder: 'Education Background', rows: 3 },
          { name: 'experience', placeholder: 'Work Experience', rows: 3 },
          { name: 'message', placeholder: 'Additional Message', rows: 4 },
        ].map(({ name, placeholder, rows }) => (
          <textarea
            key={name}
            name={name}
            placeholder={placeholder}
            rows={rows}
            value={form[name]}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
          />
        ))}

        <div>
          <label className="block text-sm mb-1 font-semibold">Upload Passport Image:</label>
          <input
            type="file"
            name="passportImage"
            accept="image/*"
            onChange={handleFileChange}
            className="text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />
        </div>

        <div>
          <label className="block text-sm mb-1 font-semibold">Upload IELTS Copy (PDF):</label>
          <input
            type="file"
            name="ieltsFile"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md"
        >
          📤 Submit Application
        </button>

        {status && <p className="text-sm mt-4 text-center text-gray-300">{status}</p>}
      </form>
    </div>
  );
};

export default UserApplicationForm;
