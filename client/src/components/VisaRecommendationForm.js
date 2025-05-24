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

    let result = '⚠️ We recommend a General Visa. Please consult an agent.';

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
    <div className="max-w-2xl mx-auto p-8 mt-10 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl shadow-xl border border-gray-700 text-white animate-fade-in">
      <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
        ✨ Find the Right Visa for You
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <select
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
          required
        >
          <option value="">🌍 What's your purpose?</option>
          <option value="study">📘 Study</option>
          <option value="work">💼 Work</option>
          <option value="travel">🛫 Travel</option>
        </select>

        <input
          name="country"
          placeholder="Preferred Country"
          value={formData.country}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg placeholder-gray-400"
          required
        />

        <select
          name="education"
          value={formData.education}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg"
        >
          <option value="">🎓 Highest Education</option>
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
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg placeholder-gray-400"
        />

        <input
          name="ielts"
          type="number"
          step="0.5"
          placeholder="IELTS Score"
          value={formData.ielts}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg placeholder-gray-400"
        />

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition duration-300 shadow-md"
        >
          🔍 Get Recommendation
        </button>
      </form>

      {recommendation && (
        <div className="mt-6 p-5 bg-gradient-to-br from-purple-800/20 to-pink-800/20 border border-purple-600/30 rounded-xl text-center">
          <p className="text-xl font-semibold text-white">{recommendation}</p>
        </div>
      )}

      <style>{`
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default VisaRecommendationForm;
