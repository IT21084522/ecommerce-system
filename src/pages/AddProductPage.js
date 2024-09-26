import React, { useState } from 'react';
import axios from 'axios';
import { FaUsers, FaBox, FaShoppingCart, FaWarehouse, FaSignOutAlt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/AddProductPage.css'; // Assume you have a CSS file for styling

const AddProductPage = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [isActive, setIsActive] = useState(true);

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const newProduct = { name, price, stock, category, isActive };
      await axios.post('http://your-api-url.com/api/products', newProduct);
      alert('Product created successfully');
      resetForm();
    } catch (error) {
      alert('Failed to create product');
    }
  };

  const resetForm = () => {
    setName('');
    setPrice('');
    setStock('');
    setCategory('');
    setIsActive(true);
  };

  return (
    <div className="addproduct-container">
      {/* Header */}
      <header className="dashboard-header d-flex justify-content-between align-items-center">
        <h2>Add New Product</h2>
        <button
          className="btn btn-outline-danger"
          onClick={() => {
            localStorage.clear();
            window.location.href = '/login';
          }}
        >
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

      {/* Main Content */}
      <div className="dashboard-main">
        <div className="container mt-5">
          <h2 className="mb-4 text-center">Add New Product</h2>
          <form onSubmit={handleCreateProduct}>
            <div className="form-group mb-3">
              <label>Product Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Price</label>
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Stock</label>
              <input
                type="number"
                className="form-control"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="Enter stock"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Category</label>
              <input
                type="text"
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter category"
                required
              />
            </div>
            <div className="form-group form-check mb-4">
              <input
                type="checkbox"
                className="form-check-input"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
              <label className="form-check-label">Active</label>
            </div>
            <button type="submit" className="btn btn-primary w-100">Create Product</button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>&copy; 2024 E-Commerce Admin Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AddProductPage;
