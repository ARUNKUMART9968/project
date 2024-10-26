// Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import { useAuth } from '../context/AuthContext';
import './Login.css'; // Import the separate CSS file for login

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('Email and password are required');
        }
        try {
            const url = "http://localhost:8080/auth/login";
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;

            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                login();
                localStorage.setItem('refreshPage', 'true');
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else {
                handleError(message);
            }
        } catch (err) {
            handleError('An error occurred during login.');
        }
    };

    return (
        <div className='homepage-container'>
        <div className="login-container">
            <div className="login-left">
                <img src="/4-indian-railway-subsidy-option-on-rail-tickets-irctc-booking.avif" alt="Rail Madad" className="login-image" />
                <h2>Welcome Back to Rail Madad</h2>
                <p>Access a range of services including:</p>
                <ul>
                    <li>Submitting complaints</li>
                    <li>Tracking issues</li>
                    <li>Getting real-time updates</li>
                </ul>
            </div>
            <div className="login-right">
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor='email'>Email</label>
                        <input
                            onChange={handleChange}
                            type='email'
                            name='email'
                            placeholder='Enter your email...'
                            value={loginInfo.email}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor='password'>Password</label>
                        <input
                            onChange={handleChange}
                            type='password'
                            name='password'
                            placeholder='Enter your password...'
                            value={loginInfo.password}
                            required
                        />
                    </div>
                    <button type='submit'>Login</button>
                    <span>Don't have an account? <Link to="/signup">Signup</Link></span>
                </form>
            </div>
            <ToastContainer />
        </div>
        </div>
    );
}

export default Login;
