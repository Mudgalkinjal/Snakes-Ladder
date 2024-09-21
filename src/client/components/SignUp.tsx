"use client";

import React, { useState } from 'react';
import '../styles/globals.css';
import Link from 'next/link';

interface SignUpProps {
    onSignUp: (username: string, email: string, password: string) => Promise<void>;
    errorMessage: string;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    setSuccessMessage: React.Dispatch<React.SetStateAction<string>>;
}

const SignUp: React.FC<SignUpProps> = ({ onSignUp, errorMessage, setErrorMessage, setSuccessMessage }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (!username || !email || !password) {
            return alert('Please enter all fields');
        }

        try {
            await onSignUp(username, email, password);
            setSuccessMessage('Sign-up successful!');
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                if (error.message.includes('Email already exists')) {
                    setErrorMessage('Email already exists. Please use a different email.');
                } else {
                    setErrorMessage('Sign-up failed. Please try again.');
                }
            } else {
                setErrorMessage('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                />
                <button type="submit">Sign Up</button>
                {errorMessage && <p className="error">{errorMessage}</p>}
            </form>
            <p>
                Already have an account?{' '}
                <Link href="/login">Login here</Link>
            </p>
        </div>
    );
};

export default SignUp;
