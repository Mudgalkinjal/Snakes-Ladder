import React, { useState } from 'react';
import axios from 'axios';
import '../styles/globals.css'

interface LoginProps {
  onLogin: (email: string, password: string) => Promise<{ token: string }>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

const Login: React.FC<LoginProps> = ({ onLogin, errorMessage, setErrorMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      return alert('Please enter all fields');
    }

    try {
      const response = await onLogin(email, password);
      if (response && response.token) {
        const { token } = response;
        console.log('Token:', token);
        localStorage.setItem('authToken', token);
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="login-component-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          className="login-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" type="submit">Login</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Login;
