import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Admin'); // Default role

  // Fetch existing users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://your-api-url.com/api/users');
        setUsers(response.data);
      } catch (error) {
        alert('Failed to fetch users');
      }
    };
    fetchUsers();
  }, []);

  // Handle the creation of a new user
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
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      alert('Failed to delete user');
    }
  };

  return (
    <div>
      <h1>User Management</h1>
      <form onSubmit={handleCreateUser}>
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
        <button type="submit">Create User</button>
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
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagementPage;
