import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/login/register`, {
                username,
                password
            });
            history.push('/');
        } catch (error) {
            setError('Error registering: Invalid username or password');
        }
    };

    return (
        <div>
            <h1>Register</h1>
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

export default RegisterPage;