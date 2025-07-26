import React, { useState } from 'react';
import toast from 'react-hot-toast';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function Auth({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_BASE}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Login successful");
        onLogin(data.user);
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Could not connect to server");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 bg-gray-900 text-yellow-100 max-w-md mx-auto mt-20 rounded-xl border border-yellow-700 shadow-lg">
      <h2 className="text-3xl font-bold mb-4 text-center">Login</h2>

      {error && <p className="text-red-400 mb-3 text-center">{error}</p>}

      <input
        className="w-full p-3 mb-3 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="w-full p-3 mb-4 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={login}
        disabled={loading}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded transition"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
}

export default Auth;
