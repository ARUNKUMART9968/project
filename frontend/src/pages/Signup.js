import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import './Signup.css'; // Import the separate CSS file for signup

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError('Name, email, and password are required');
        }
        try {
            const url = 'http://localhost:8080/auth/signup';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            const { success, message, jwtToken, error } = result;

            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                localStorage.setItem('refreshPage', 'true'); // Set flag to trigger refresh
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            } else if (error) {
                const details = error?.details[0]?.message || 'An error occurred';
                handleError(details);
            } else {
                handleError(message || 'An error occurred');
            }
        } catch (err) {
            handleError(err.message || 'An error occurred');
        }
    };

    return (
        <div className='homepage-container'>
        <div className='signup-container'>
            <div className="signup-left">
                <img 
                    src="/4-indian-railway-subsidy-option-on-rail-tickets-irctc-booking.avif" // Replace with the correct path to your image
                    alt="Rail Madad" 
                    className="signup-image" 
                />
                <h2>Join Rail Madad</h2>
                <p>Get started to access a range of services including:</p>
                <ul>
                    <li>Submitting complaints</li>
                    <li>Tracking issues</li>
                    <li>Getting real-time updates</li>
                </ul>
            </div>
            <div className="signup-right">
                <h1>Signup</h1>
                <form onSubmit={handleSignup}>
                    <div className="form-group">
                        <label htmlFor='name'>Name</label>
                        <input
                            onChange={handleChange}
                            type='text'
                            name='name'
                            autoFocus
                            placeholder='Enter your name...'
                            value={signupInfo.name}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor='email'>Email</label>
                        <input
                            onChange={handleChange}
                            type='email'
                            name='email'
                            placeholder='Enter your email...'
                            value={signupInfo.email}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor='password'>Password</label>
                        <input
                            onChange={handleChange}
                            type='password'
                            name='password'
                            placeholder='Enter your password...'
                            value={signupInfo.password}
                        />
                    </div>
                    <button type='submit'>Signup</button>
                    <span>
                        Already have an account? <Link to="/login">Login</Link>
                    </span>
                </form>
            </div>
            <ToastContainer />
        </div>
        </div>
    );
}

export default Signup;
