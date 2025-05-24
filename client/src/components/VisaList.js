import React, { useEffect, useState } from 'react';
import { fetchVisaTypes } from '../api/api';

const VisaList = () => {
  const [visas, setVisas] = useState([]);

  useEffect(() => {
    fetchVisaTypes().then(setVisas);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        🌐 Available Visa Types
      </h2>

      <ul className="space-y-6">
        {visas.map((visa) => (
          <li
            key={visa._id}
            className="bg-gradient-to-br from-gray-800 via-gray-900 to-black border border-gray-700 p-5 rounded-2xl shadow-lg transition hover:shadow-purple-500/20 hover:scale-[1.01]"
          >
            <h3 className="text-xl font-semibold text-white mb-2">{visa.type}</h3>
            <p className="text-gray-300 mb-2">{visa.description}</p>
            {visa.country && (
              <p className="text-sm text-purple-400">
                🌍 <span className="font-medium">Country:</span> {visa.country}
              </p>
            )}
          </li>
        ))}
      </ul>

      {visas.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No visa types available at the moment.</p>
      )}
    </div>
  );
};

export default VisaList;
