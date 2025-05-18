import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/admin');
  };

  return <LoginForm onLogin={handleLogin} />;
};

export default LoginPage;
