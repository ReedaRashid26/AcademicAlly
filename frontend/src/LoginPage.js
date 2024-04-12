import React, { useState } from 'react';
import axios from 'axios';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
                username,
                password
            });
            console.log('User logged in: ', response.data);
        } catch (error) {
            setError('Error logging in: Invalid username or password');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleFormSubmit}>
                <label>
                    Username:
                    <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default LoginPage;