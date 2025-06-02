import React from 'react';
import LoginForm from '../components/LoginForm';
import './AuthPage.css'; // Shared styles for login/register pages

const LoginPage: React.FC = () => {
  return (
    <div className="auth-page-container">
      <LoginForm />
    </div>
  );
};

export default LoginPage;