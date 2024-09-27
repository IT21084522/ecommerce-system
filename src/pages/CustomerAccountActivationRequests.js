import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { FaUserCheck, FaUserTimes, FaSignOutAlt, FaUsers, FaBox, FaShoppingCart, FaWarehouse } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/CustomerAccountActivationRequests.css'; // Assume a CSS file for styling

const CustomerAccountActivationRequests = () => {
  const [activationRequests, setActivationRequests] = useState([]);

  // Fetch account activation requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://your-api-url.com/api/activation-requests');
        setActivationRequests(response.data);
      } catch (error) {
        alert('Failed to fetch activation requests');
      }
    };
    fetchRequests();
  }, []);

  const handleApprove = async (customerId) => {
    try {
      await axios.put(`http://your-api-url.com/api/customers/${customerId}/approve`);
      setActivationRequests(activationRequests.filter(request => request.id !== customerId));
      alert('Customer account approved');
    } catch (error) {
      alert('Failed to approve account');
    }
  };

  const handleDeny = async (customerId) => {
    try {
      await axios.put(`http://your-api-url.com/api/customers/${customerId}/deny`);
      setActivationRequests(activationRequests.filter(request => request.id !== customerId));
      alert('Customer account denied');
    } catch (error) {
      alert('Failed to deny account');
    }
  };

  return (
    <div className="customer-account-activation-container">
      {/* Header */}
      <header className="dashboard-header d-flex justify-content-between align-items-center">
        <h2>Customer Account Activation Requests</h2>
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
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        <h2 className="mb-4 text-center">Customer Account Activation Requests</h2>
        <Table striped bordered hover className="table-responsive">
          <thead className="thead-dark">
            <tr>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {activationRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.name}</td>
                <td>{request.email}</td>
                <td>
                  <Button variant="success" size="sm" onClick={() => handleApprove(request.id)}>
                    <FaUserCheck /> Approve
                  </Button>{' '}
                  <Button variant="danger" size="sm" onClick={() => handleDeny(request.id)}>
                    <FaUserTimes /> Deny
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>&copy; 2024 E-Commerce Admin Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CustomerAccountActivationRequests;
