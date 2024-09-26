import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaList, FaCog, FaUsers, FaBox, FaShoppingCart, FaWarehouse, FaSignOutAlt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/ProductManagementDashboard.css'; // Custom CSS for animations and styles

const ProductManagementDashboard = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="product-management-container">
      {/* Header */}
      <header className="dashboard-header d-flex justify-content-between align-items-center">
        <h2>Product Management Dashboard</h2>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
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

      {/* Main Dashboard Area */}
      <div className="dashboard-main">
        <div className="container mt-5">
          <div className="row text-center">
            <h1 className="mb-4">Product Management</h1>

            <div className="col-md-4">
              <div className="card dashboard-card shadow-lg p-4 mb-4 bg-white">
                <FaPlus className="dashboard-icon" />
                <h3>Add New Product</h3>
                <p>Create a new product listing with details like price, stock, and category.</p>
                <Link to="/products/add" className="btn btn-primary w-100">Add Product</Link>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card dashboard-card shadow-lg p-4 mb-4 bg-white">
                <FaList className="dashboard-icon" />
                <h3>View Existing Products</h3>
                <p>View, update, or delete existing product listings.</p>
                <Link to="/products/view" className="btn btn-primary w-100">View Products</Link>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card dashboard-card shadow-lg p-4 mb-4 bg-white">
                <FaCog className="dashboard-icon" />
                <h3>Manage Categories</h3>
                <p>Activate or deactivate product categories.</p>
                <Link to="/products/categories" className="btn btn-primary w-100">Manage Categories</Link>
              </div>
            </div>
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

export default ProductManagementDashboard;
