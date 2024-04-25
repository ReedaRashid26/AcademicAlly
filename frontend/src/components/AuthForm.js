import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, TextField, Paper, Typography, Box } from '@mui/material';

// Insert the relative path to your logo image
import logoImage from '../images/logo.png'; // Update the import path to your logo image

function AuthForm({ isLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitted", { email, password });
        navigate('/home'); // Redirect to Home after login or registration
    };

    const backgroundStyle = {
        height: '100vh',
        display: 'flex',
        justifyContent: 'flex-end', // Pushes the child to the right
        alignItems: 'center', // Centers the child vertically
        backgroundImage: 'url(/deer-forest.jpg)', // Path to the background image
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'left',
    };

    const formStyle = {
        margin: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px', // Adds padding inside the form area
        backgroundColor: '#24283b', // Dark background for the form
        color: '#a9b1d6', // Light text for the dark background
        marginRight: '140px', // Adjust the size of the margin to create the desired spacing
        width: 'calc(30% - 20px)', // Subtract the same margin from the width to maintain the form size
        height: '90%', // Adjust the height of the form
    };

    return (
        <div style={backgroundStyle}>
            <Paper elevation={6} style={formStyle}>
                <img src={logoImage} alt="Logo" style={{ width: '100px', marginBottom: '20px' }} />
                <Typography component="h1" variant="h5" style={{ color: '#a9b1d6', marginBottom: '20px' }}>
                    {isLogin ? 'Login' : 'Register'}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        InputProps={{ style: { color: '#a9b1d6' } }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
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
