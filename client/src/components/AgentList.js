import React, { useEffect, useState } from 'react';
import { fetchAgents } from '../api/api';

const AgentList = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    fetchAgents().then(setAgents);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Our Agents</h2>
      <ul className="space-y-3">
        {agents.map((agent) => (
          <li key={agent._id} className="border p-3 rounded shadow">
            <h3 className="font-semibold">{agent.name} — {agent.agency}</h3>
            <p>{agent.description}</p>
            <p className="text-sm text-gray-500">
              {agent.email && <>📧 {agent.email}</>}
              {agent.phone && <> | 📞 {agent.phone}</>}
              {agent.country && <> | 🌍 {agent.country}</>}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgentList;
