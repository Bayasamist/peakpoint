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
        setStatus(data.message);
        setForm({
          name: '', email: '', phone: '', education: '',
          experience: '', country: '', visaType: '', message: ''
        });
        setPassportImage(null);
        setIeltsFile(null);
      } else {
        setStatus(data.error || 'Submission failed.');
      }
    } catch (err) {
      console.error(err);
      setStatus('Network error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto border p-4 rounded shadow my-6">
      <h2 className="text-xl font-bold mb-4">Study/Immigration Application</h2>
      <form onSubmit={handleSubmit} className="space-y-3" encType="multipart/form-data">
        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="country" placeholder="Preferred Country" value={form.country} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="visaType" placeholder="Visa Type (e.g. Student, PR, Work)" value={form.visaType} onChange={handleChange} className="w-full p-2 border rounded" />
        <textarea name="education" placeholder="Education Background" value={form.education} onChange={handleChange} className="w-full p-2 border rounded" />
        <textarea name="experience" placeholder="Work Experience" value={form.experience} onChange={handleChange} className="w-full p-2 border rounded" />
        <textarea name="message" placeholder="Additional Message" value={form.message} onChange={handleChange} className="w-full p-2 border rounded" />

        <div>
          <label className="block mb-1 font-medium">Upload Passport Image:</label>
          <input type="file" name="passportImage" accept="image/*" onChange={handleFileChange} />
        </div>

        <div>
          <label className="block mb-1 font-medium">Upload IELTS Copy (PDF):</label>
          <input type="file" name="ieltsFile" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Submit Application
        </button>

        {status && <p className="text-sm mt-2">{status}</p>}
      </form>
    </div>
  );
};

export default UserApplicationForm;
