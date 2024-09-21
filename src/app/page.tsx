"use client";

import React, { useState } from 'react';
import SignUp from '../client/components/SignUp';

const Home: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignUp = async (username: string, email: string, password: string) => {
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      console.log('Sign-up successful:', data);
      setSuccessMessage('Sign-up successful!'); // Add this line to set success message
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        console.error('Error during sign-up:', error.message);
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
        console.error('Unexpected error during sign-up:', error);
      }
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to the Snakes and Ladders game</h1>
      <SignUp
        onSignUp={handleSignUp}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        setSuccessMessage={setSuccessMessage}
      />
      {!errorMessage && <p className="success">{successMessage}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
};

export default Home;
