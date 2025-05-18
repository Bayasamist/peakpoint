import React, { useState } from 'react';

const VisaRecommendationForm = () => {
  const [formData, setFormData] = useState({
    purpose: '',
    country: '',
    education: '',
    experience: '',
    ielts: ''
  });

  const [recommendation, setRecommendation] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { purpose, education, experience, ielts } = formData;

    let result = 'We recommend a General Visa. Please contact an agent for advice.';

    if (purpose === 'study' && parseFloat(ielts) >= 5.5) {
      result = '🎓 Recommended: Student Visa';
    } else if (purpose === 'work' && parseInt(experience) >= 2) {
      result = '💼 Recommended: Skilled Work Visa';
    } else if (purpose === 'travel') {
      result = '🧳 Recommended: Tourist Visa';
    }

    setRecommendation(result);
  };

  return (
    <div className="max-w-xl mx-auto p-6 border rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Find the Right Visa</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select name="purpose" value={formData.purpose} onChange={handleChange} className="w-full p-2 border rounded" required>
          <option value="">What is your purpose?</option>
          <option value="study">Study</option>
          <option value="work">Work</option>
          <option value="travel">Travel</option>
        </select>

        <input
          name="country"
          placeholder="Preferred Country"
          value={formData.country}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <select name="education" value={formData.education} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">Highest Education Level</option>
          <option value="highschool">High School</option>
          <option value="bachelor">Bachelor’s Degree</option>
          <option value="master">Master’s or Higher</option>
        </select>

        <input
          name="experience"
          type="number"
          placeholder="Years of Work Experience"
          value={formData.experience}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          name="ielts"
          type="number"
          step="0.5"
          placeholder="IELTS Score"
          value={formData.ielts}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
          Get Recommendation
        </button>
      </form>

      {recommendation && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded text-center">
          <p className="text-lg font-semibold">{recommendation}</p>
        </div>
      )}
    </div>
  );
};

export default VisaRecommendationForm;
