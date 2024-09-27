import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { FaUserCheck, FaSignOutAlt, FaUsers, FaBox, FaShoppingCart, FaWarehouse, FaUserCog } from 'react-icons/fa'; // Added FaUserCog for Customer Management
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/DeactivatedAccountReactivation.css'; // Custom CSS for styling

const DeactivatedAccountReactivation = () => {
  const [deactivatedAccounts, setDeactivatedAccounts] = useState([]);

  // Fetch deactivated accounts
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get('http://your-api-url.com/api/deactivated-accounts');
        setDeactivatedAccounts(response.data);
      } catch (error) {
        alert('Failed to fetch deactivated accounts');
      }
    };
    fetchAccounts();
  }, []);

  const handleReactivate = async (customerId) => {
    try {
      await axios.put(`http://your-api-url.com/api/customers/${customerId}/reactivate`);
      setDeactivatedAccounts(deactivatedAccounts.filter(account => account.id !== customerId));
      alert('Customer account reactivated');
    } catch (error) {
      alert('Failed to reactivate account');
    }
  };

  return (
    <div className="deactivated-account-container">
      {/* Header */}
      <header className="dashboard-header d-flex justify-content-between align-items-center">
        <h2>Deactivated Account Reactivation</h2>
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
            <li><a href="/customer-management"><FaUserCog className="sidebar-icon" /> <span>Customer Management</span></a></li> {/* Added Customer Management */}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        <h2 className="mb-4 text-center">Deactivated Account Reactivation</h2>
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
            {deactivatedAccounts.map((account) => (
              <tr key={account.id}>
                <td>{account.id}</td>
                <td>{account.name}</td>
                <td>{account.email}</td>
                <td>
                  <Button variant="success" size="sm" onClick={() => handleReactivate(account.id)}>
                    <FaUserCheck /> Reactivate
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

export default DeactivatedAccountReactivation;
