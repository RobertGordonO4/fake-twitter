import React from 'react';
import RegisterForm from '../components/RegisterForm';
import './AuthPage.css'; // Shared styles for login/register pages

const RegisterPage: React.FC = () => {
  return (
    <div className="auth-page-container">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;