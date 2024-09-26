import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Button, Form, Modal } from 'react-bootstrap';
import { FaUserEdit, FaUserPlus, FaTrash, FaUsers, FaBox, FaShoppingCart, FaWarehouse, FaSignOutAlt } from 'react-icons/fa';
import './css/UserManagementPage.css'; // For custom CSS animations and styles

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Admin'); // Default role
  const [editingUser, setEditingUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
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

  // Handle user creation or update
  const handleSubmitUser = async (e) => {
    e.preventDefault();
    try {
      const newUser = { name, email, role };
      if (editingUser) {
        const response = await axios.put(`http://your-api-url.com/api/users/${editingUser.id}`, newUser);
        setUsers(users.map((user) => (user.id === editingUser.id ? response.data : user)));
        setEditingUser(null);
      } else {
        const response = await axios.post('http://your-api-url.com/api/users', newUser);
        setUsers([...users, response.data]);
      }
      setName('');
      setEmail('');
      setRole('Admin');
      setShowModal(false);
    } catch (error) {
      alert('Failed to submit user');
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

  // Handle editing a user
  const handleEditUser = (user) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setShowModal(true); // Open modal for editing
  };

  // Open modal for creating a new user
  const handleCreateUser = () => {
    setEditingUser(null);
    setName('');
    setEmail('');
    setRole('Admin');
    setShowModal(true);
  };

  return (
    <div className="usermanagement-container">
      {/* Header */}
      <header className="dashboard-header d-flex justify-content-between align-items-center">
        <h2>User Management</h2>
        <Button variant="outline-danger" onClick={() => { localStorage.clear(); window.location.href = '/login'; }}>
          <FaSignOutAlt /> Logout
        </Button>
      </header>

      {/* Sidebar Navigation */}
      <div className="sidebar">
        <nav>
          <ul>
            <li><a href="/users"><FaUsers className="sidebar-icon" /> <span>User Management</span></a></li>
            <li><a href="/products"><FaBox className="sidebar-icon" /> <span>Product Management</span></a></li>
            <li><a href="/order-management"><FaShoppingCart className="sidebar-icon" /> <span>Order Management</span></a></li>
            <li><a href="/inventory"><FaWarehouse className="sidebar-icon" /> <span>Inventory Management</span></a></li>
            <li><a href="/customer-orders"><FaShoppingCart className="sidebar-icon" /> <span>Customer Order Management</span></a></li>
            <li><a href="/vendors"><FaUsers className="sidebar-icon" /> <span>Vendor Management</span></a></li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <Container fluid className="dashboard-main">
        {isAdmin ? (
          <>
            <Button variant="primary" className="mb-4" onClick={handleCreateUser}>
              <FaUserPlus /> Create New User
            </Button>

            <Table striped bordered hover className="users-table">
              <thead className="thead-dark">
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
                      <Button variant="warning" size="sm" onClick={() => handleEditUser(user)}>
                        <FaUserEdit /> Edit
                      </Button>{' '}
                      <Button variant="danger" size="sm" onClick={() => handleDeleteUser(user.id)}>
                        <FaTrash /> Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        ) : (
          <p>You do not have permission to access this page.</p>
        )}
      </Container>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>&copy; 2024 E-Commerce Admin Dashboard. All rights reserved.</p>
      </footer>

      {/* Modal for Creating/Editing User */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingUser ? 'Edit User' : 'Create New User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitUser}>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Form.Group controlId="formRole" className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Admin">Admin</option>
                <option value="Vendor">Vendor</option>
                <option value="CSR">CSR</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              {editingUser ? 'Update User' : 'Create User'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserManagementPage;
