import React, { useEffect, useState } from 'react';

const ViewMessages = () => {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setStatus('❌ Unauthorized');
      return;
    }

    fetch('http://localhost:5000/api/contact', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setMessages(data);
        else setStatus(data.error || 'Failed to load messages');
      })
      .catch(() => setStatus('❌ Network error'));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">User Messages</h2>
      {status && <p>{status}</p>}
      <ul className="space-y-4">
        {messages.map(msg => (
          <li key={msg._id} className="border p-3 rounded shadow">
            <p><strong>{msg.name}</strong> ({msg.email})</p>
            <p>{msg.message}</p>
            <p className="text-sm text-gray-500">{new Date(msg.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewMessages;
