import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Admin'); // Default role
  const [editingUser, setEditingUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Fetch existing users and check if the current user is an Admin
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://your-api-url.com/api/users');
        setUsers(response.data);

        const currentRole = localStorage.getItem('role');
        setIsAdmin(currentRole === 'Admin'); // Check if the user is an Admin
      } catch (error) {
        alert('Failed to fetch users');
      }
    };
    fetchUsers();
  }, []);

  // Handle user creation
  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const newUser = { name, email, role };
      const response = await axios.post('http://your-api-url.com/api/users', newUser);
      setUsers([...users, response.data]);
      setName('');
      setEmail('');
      setRole('Admin');
    } catch (error) {
      alert('Failed to create user');
    }
  };

  // Handle user deletion
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://your-api-url.com/api/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      alert('Failed to delete user');
    }
  };

  // Handle user update
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = { name, email, role };
      const response = await axios.put(`http://your-api-url.com/api/users/${editingUser.id}`, updatedUser);
      setUsers(users.map((user) => (user.id === editingUser.id ? response.data : user)));
      setEditingUser(null);
      setName('');
      setEmail('');
      setRole('Admin');
    } catch (error) {
      alert('Failed to update user');
    }
  };

  // Handle editing a user
  const handleEditUser = (user) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
  };

  return (
    <div>
      <h1>User Management</h1>

      {isAdmin ? (
        <>
          <form onSubmit={editingUser ? handleUpdateUser : handleCreateUser}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="Admin">Admin</option>
              <option value="Vendor">Vendor</option>
              <option value="CSR">CSR</option>
            </select>
            <button type="submit">{editingUser ? 'Update User' : 'Create User'}</button>
          </form>

          <h2>Existing Users</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={() => handleEditUser(user)}>Edit</button>
                    <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>You do not have permission to access this page.</p>
      )}
    </div>
  );
};

export default UserManagementPage;
