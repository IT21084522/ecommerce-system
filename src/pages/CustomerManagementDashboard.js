import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FaUserCheck, FaUserTimes, FaSignOutAlt, FaUsers, FaBox, FaShoppingCart, FaWarehouse } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/CustomerManagementDashboard.css'; // Custom CSS for animations and styles

const CustomerManagementDashboard = () => {
//   const userRole = localStorage.getItem('role'); // Check user role (Admin or CSR)
const userRole = 'CSR';
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="customer-management-container">
      {/* Header */}
      <header className="dashboard-header d-flex justify-content-between align-items-center">
        <h2>Customer Management Dashboard</h2>
        <Button variant="outline-danger" onClick={handleLogout}>
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

      {/* Main Dashboard Area */}
      <div className="dashboard-main">
        <div className="container mt-5">
          <div className="row text-center">
            <h1 className="mb-4">Customer Management</h1>

            {userRole === 'Admin' || userRole === 'CSR' ? (
              <div className="col-md-6">
                <div className="card dashboard-card shadow-lg p-4 mb-4 bg-white">
                  <FaUserCheck className="dashboard-icon" />
                  <h3>Customer Account Activation Requests</h3>
                  <p>Review and activate pending customer accounts.</p>
                  <Button variant="primary" className="w-100" onClick={() => window.location.href = '/customer-account-activation'}>
                    <FaUserCheck /> Activate Accounts
                  </Button>
                </div>
              </div>
            ) : null}

            {userRole === 'CSR' ? (
              <div className="col-md-6">
                <div className="card dashboard-card shadow-lg p-4 mb-4 bg-white">
                  <FaUserTimes className="dashboard-icon" />
                  <h3>Deactivated Account Reactivation</h3>
                  <p>Handle requests to reactivate customer accounts.</p>
                  <Button variant="warning" className="w-100" onClick={() => window.location.href = '/deactivated-account-reactivation'}>
                    <FaUserTimes /> Reactivate Accounts
                  </Button>
                </div>
              </div>
            ) : null}

          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>&copy; 2024 E-Commerce Admin Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CustomerManagementDashboard;
