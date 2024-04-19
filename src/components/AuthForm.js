import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, TextField, Paper, Typography, Container } from '@mui/material';

function AuthForm({ isLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitted", { email, password });
        navigate('/home'); // Redirect to Home after login or registration
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper style={{ padding: 16, marginTop: 50 }}>
                <Typography component="h1" variant="h5">
                    {isLogin ? 'Login' : 'Register'}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Typography align="center" style={{ margin: '10px 0' }}>
                        {isLogin ? (
                            <Link to="/register">Don't have an account? Click to register.</Link>
                        ) : (
                            <Link to="/login">Already have an account? Click to log in.</Link>
                        )}
                    </Typography>
                    <Button type="submit" fullWidth variant="contained" color="primary">
                        {isLogin ? 'Log In' : 'Register'}
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}

export default AuthForm;
