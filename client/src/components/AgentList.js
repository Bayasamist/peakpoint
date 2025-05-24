import React, { useEffect, useState } from 'react';
import { fetchAgents } from '../api/api';

const AgentList = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    fetchAgents().then(setAgents);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        🌍 Meet Our Trusted Agents
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {agents.map((agent) => (
          <div
            key={agent._id}
            className="bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6 rounded-2xl border border-gray-700 shadow-lg transition-transform hover:scale-105"
          >
            <h3 className="text-xl font-semibold text-white mb-2">
              {agent.name} <span className="text-purple-400">— {agent.agency}</span>
            </h3>
            <p className="text-gray-300 mb-4">{agent.description}</p>
            <div className="text-sm text-gray-400 space-y-1">
              {agent.email && (
                <p>📧 <span className="text-gray-300">{agent.email}</span></p>
              )}
              {agent.phone && (
                <p>📞 <span className="text-gray-300">{agent.phone}</span></p>
              )}
              {agent.country && (
                <p>🌍 <span className="text-gray-300">{agent.country}</span></p>
              )}
            </div>
          </div>
        ))}
      </div>

      {agents.length === 0 && (
        <p className="text-center text-gray-400 mt-10">No agents available at the moment.</p>
      )}
    </div>
  );
};

export default AgentList;
