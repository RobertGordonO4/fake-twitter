// src/components/LoginForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authApiClient, LoginDto, AuthResponse, User } from '../services/apiClient';
import './Form.css';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const loginDto: LoginDto = { username, password };
    try {
      const response = await authApiClient.login(loginDto);

      // THIS PART WILL CHANGE AFTER BACKEND FIX & REGENERATION
      const data = response.data as AuthResponse | undefined; // Temporary

      if (data && data.accessToken && data.user) {
        login(data.accessToken, data.user as User);
        navigate('/');
      } else {
        setError('Login successful, but user data missing. Please contact support or try again.');
      }
    } catch (err: any) {
      console.error('Login failed:', err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };
  // ... (rest of the form JSX remains the same)
  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;