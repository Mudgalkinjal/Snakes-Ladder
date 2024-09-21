import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Login from '../client/components/Login';
import axios from 'axios';

const LoginPage: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();

    const handleLogin = async (email: string, password: string) => {
        console.log('here')

        try {
            console.log('in success')

            const response = await axios.post('/api/login', {
                email,
                password,
            });
            console.log('Response:', response);

            const data = response.data;
            const token = data.token;
            console.log('Login successful:', data);

            localStorage.setItem('authToken', token);
            setSuccessMessage('Login successful!');
            setErrorMessage('');

            setTimeout(() => {
                router.push('/choice');
            }, 2000);

            return { token };
        } catch (error) {
            console.log('Error:', error);

            if (axios.isAxiosError(error)) {
                setErrorMessage(error.response?.data.message || 'Login failed');
            } else {
                setErrorMessage('An unexpected error occurred. Please try again.');
            }
            throw new Error(errorMessage);
        }
    };

    return (
        <div className="login-page-container">
            <h1>Login to Your Account</h1>
            {successMessage && <p className="success">{successMessage}</p>}
            {errorMessage && <p className="error">{errorMessage}</p>}
            <Login onLogin={handleLogin} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
        </div>
    );
};

export default LoginPage;
