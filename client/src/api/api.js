const BASE_URL = "http://localhost:5000/api";

export const createVisaType = async (formData) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/visas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(formData)
  });

  return res.json();
};

export const fetchVisaTypes = async () => {
  const res = await fetch(`${BASE_URL}/visas`);
  return res.json();
};

export const fetchAgents = async () => {
  const res = await fetch(`${BASE_URL}/agents`);
  return res.json();
};

export const submitContactForm = async (data) => {
  const res = await fetch(`${BASE_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};


