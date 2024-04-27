import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Paper, Typography } from '@mui/material';
import logoImage from '../images/logo.png';
import backgroundImage from '../images/deer-forest.jpg';

function AuthForm({ isLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Reset errors on new submission
        setEmailError('');
        setPasswordError('');

        const url = isLogin ? 'http://localhost:8080/api/users/login' : 'http://localhost:8080/api/users/register';
        axios.post(url, { email, password })
            .then(response => {
                console.log(response.data); // Handle login/register response
                navigate('/home'); // Navigate on successful login/register
            })
            .catch(error => {
                console.error('Authentication failed', error);
                if (error.response) {
                    if (error.response.status === 400) {
                        // Backend validation errors will be in the response data
                        // Assume error.response.data is an object like { email: "Email is required", password: "Password is required" }
                        setEmailError(error.response.data.email || '');
                        setPasswordError(error.response.data.password || '');
                    } else {
                        // For other statuses, you can set a general error message
                        setMessage(error.response.data || 'An unexpected error occurred.');
                    }
                } else {
                    setMessage('An unexpected error occurred.');
                }
            });
    };


    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundImage: `url(${backgroundImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'left',
        }}>
            <Paper elevation={6} style={{
                margin: '0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '48px',
                backgroundColor: '#24283b',
                color: '#a9b1d6',
                marginRight: '140px',
                width: 'calc(30% - 20px)',
                height: '90%',
            }}>
                <img src={logoImage} alt="Logo" style={{ width: '100px', marginBottom: '20px' }} />
                <Typography component="h1" variant="h5" style={{ color: '#a9b1d6', marginBottom: '20px' }}>
                    {isLogin ? 'Login' : 'Register'}
                </Typography>
                {message && <Typography color="error" style={{ marginBottom: '20px' }}>{message}</Typography>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        error={Boolean(emailError)}
                        helperText={emailError}
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailError(''); // Clear error when user starts typing
                        }}
                        InputProps={{ style: { color: '#a9b1d6' } }}
                    />
                    <TextField
                        error={Boolean(passwordError)}
                        helperText={passwordError}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setPasswordError(''); // Clear error when user starts typing
                        }}
                        InputProps={{ style: { color: '#a9b1d6' } }}
                    />

                    <Link to={isLogin ? "/register" : "/login"} style={{ color: '#bb9af7', marginTop: '20px', textDecoration: 'none' }}>
                        {isLogin ? "Don't have an account? Register" : "Already have an account? Log in"}
                    </Link>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '20px', backgroundColor: '#7aa2f7' }}
                    >
                        {isLogin ? 'Log In' : 'Register'}
                    </Button>
                </form>
            </Paper>
        </div>
    );
}

export default AuthForm;
// Path: src/main/frontend/src/components/CalendarComponent.js