import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './RegisterPage.css';

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleFormSubmit = (event) => {
        event.preventDefault();
        window.location.href = "/login";
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

    // const handleFormSubmit = async (event) => {
    //     event.preventDefault();
    //     try {
    //         await axios.post(`${process.env.REACT_APP_API_URL}/login/register`, {
    //             username,
    //             password
    //         });
    //         window.location.href = "/login";
    //     } catch (error) {
    //         setError('Error registering: Invalid username or password');
    //     }
    // };

    // return (
    //     <div>
    //         <div className="logout-link">
    //             <Link to="/login">Log out</Link>
    //         </div>
    //         <h1>Register</h1>
    //         <form onSubmit={handleFormSubmit}>
    //             <label>
    //                 Username:
    //                 <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} />
    //             </label>
    //             <label>
    //                 Password:
    //                 <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
    //             </label>
    //             <input type="submit" value="Submit" />
    //         </form>
    //         {error && <p>{error}</p>}
    //     </div>
    // );
}

export default RegisterPage;