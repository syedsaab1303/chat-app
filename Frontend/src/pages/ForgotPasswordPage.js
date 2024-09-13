// ForgotPasswordPage.js
import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPasswordPage.css'; // Import the CSS file

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/auth/forgot-password', { email });
            setMessage('Password reset email sent');
        } catch (error) {
            setMessage('Error sending email');
        }
    };

    return (
        <div className="forgot-password-container">
            <form className="forgot-password-form" onSubmit={handleSubmit}>
                <h2>Forgot Password</h2>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Send Reset Link</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default ForgotPasswordPage;
