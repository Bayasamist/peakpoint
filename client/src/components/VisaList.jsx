import React, { useEffect, useState } from 'react';
import { fetchVisaTypes } from '../api/api';

const VisaList = () => {
  const [visas, setVisas] = useState([]);

  useEffect(() => {
    fetchVisaTypes().then(setVisas);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Available Visa Types</h2>
      <ul className="space-y-3">
        {visas.map((visa) => (
          <li key={visa._id} className="border p-3 rounded shadow">
            <h3 className="font-semibold">{visa.type}</h3>
            <p>{visa.description}</p>
            {visa.country && <p className="text-sm text-gray-500">Country: {visa.country}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VisaList;
