import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authApiClient, RegisterDto, AuthResponse, User } from '../services/apiClient';
import './Form.css';

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    const registerDto: RegisterDto = { username, password };
    try {
      // This will change once backend spec is fixed.
      // The response will then contain AuthResponse data.
      const response = await authApiClient.register(registerDto);

      // THIS PART WILL CHANGE AFTER BACKEND FIX & REGENERATION
      // For now, to make it compile, we assume response.data might be castable.
      // In reality, response.data will be undefined with current 'void' return.
      const data = response.data as AuthResponse | undefined; // Temporary: handle undefined

      if (data && data.accessToken && data.user) {
        login(data.accessToken, data.user as User);
        navigate('/');
      } else {
        // This else block will likely be hit until backend is fixed
        setError('Registration seemed successful, but login data was not returned. Please try logging in.');
        // Potentially navigate to login page or show a specific message
      }
    } catch (err: any) {
      console.error('Registration failed:', err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };
  // ... (rest of the form JSX remains the same)
  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Register</h2>
      {error && <p className="error-message">{error}</p>}
      <div>
        <label htmlFor="reg-username">Username:</label>
        <input type="text" id="reg-username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="reg-password">Password:</label>
        <input type="password" id="reg-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="confirm-password">Confirm Password:</label>
        <input type="password" id="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;