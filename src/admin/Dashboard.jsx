import React, { useEffect, useState } from 'react';
import { Trash2, UserPlus, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'user' });
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      toast.error("Failed to load users.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    if (!newUser.username || !newUser.password) return toast.error("Please fill all fields");
    setAdding(true);
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("User added!");
        setNewUser({ username: '', password: '', role: 'user' });
        fetchUsers();
      } else {
        toast.error(data.error || "Add failed");
      }
    } catch (e) {
      toast.error("Error adding user");
    }
    setAdding(false);
  };

  const handleDelete = async (username) => {
    if (!window.confirm(`Delete ${username}?`)) return;
    try {
      const res = await fetch(`/api/users/${username}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok) {
        toast.success("User deleted");
        fetchUsers();
      } else {
        toast.error(data.error || "Delete failed");
      }
    } catch (e) {
      toast.error("Error deleting user");
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-yellow-100">
      <h1 className="text-3xl font-black mb-4">Admin Dashboard</h1>

      <div className="mb-6 bg-gray-800 p-4 rounded-xl border border-yellow-600">
        <h2 className="text-xl font-bold mb-3">Add New User</h2>
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Username"
            className="p-2 rounded bg-gray-700 text-white"
            value={newUser.username}
            onChange={e => setNewUser({ ...newUser, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 rounded bg-gray-700 text-white"
            value={newUser.password}
            onChange={e => setNewUser({ ...newUser, password: e.target.value })}
          />
          <select
            className="p-2 rounded bg-gray-700 text-white"
            value={newUser.role}
            onChange={e => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button
            className="flex items-center gap-2 bg-yellow-500 text-black font-bold px-4 py-2 rounded shadow"
            onClick={handleAddUser}
            disabled={adding}
          >
            {adding ? <Loader2 className="animate-spin w-4 h-4" /> : <UserPlus className="w-4 h-4" />} Add
          </button>
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-xl border border-yellow-600">
        <h2 className="text-xl font-bold mb-3">Users</h2>
        {loading ? (
          <p className="text-yellow-300 animate-pulse">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text-yellow-300">No users found.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-yellow-300">
                <th className="px-3 py-2">Username</th>
                <th className="px-3 py-2">Role</th>
                <th className="px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={idx} className="border-t border-yellow-700">
                  <td className="px-3 py-2">{user.username}</td>
                  <td className="px-3 py-2">{user.role}</td>
                  <td className="px-3 py-2">
                    {user.username !== 'admin' && (
                      <button
                        onClick={() => handleDelete(user.username)}
                        className="text-red-400 hover:text-red-600 flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
