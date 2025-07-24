import React from "react";
import { Link } from "react-router-dom";

function Navbar({ user, setUser }) {
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <nav className="flex gap-4 p-4 bg-gray-800 text-yellow-200">
      <Link to="/">Home</Link>
      {user && user.role === "admin" && (
        <Link to="/admin">Admin Dashboard</Link>
      )}
      <span className="ml-auto">
        {user ? (
          <>
            Logged in as {user.username}
            <button
              onClick={handleLogout}
              className="ml-4 px-2 py-1 bg-red-600 text-white rounded"
            >
              Logout
            </button>
          </>
        ) : ""}
      </span>
    </nav>
  );
}

export default Navbar;
