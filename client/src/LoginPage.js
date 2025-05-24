import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import { jwtDecode } from 'jwt-decode';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      const role = decoded.role;

      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } else {
      navigate('/');
    }
  };

  return <LoginForm onLogin={handleLogin} />;
};

export default LoginPage;
