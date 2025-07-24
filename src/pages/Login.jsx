import React, { useState } from 'react';
import { loginUser } from '../utils/auth';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const result = await loginUser(username, password); // Changed 'email' to 'username'
        if (result.success) {
            onLogin(result.user);
        } else {
            alert('Login failed');
        }
    };

    return (
        <form onSubmit={handleLogin} style={{ padding: 20 }}>
            <h2>Login</h2>
            <input
                placeholder="Username" // Changed placeholder
                value={username}
                onChange={e => setUsername(e.target.value)} // Changed setEmail to setUsername
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;