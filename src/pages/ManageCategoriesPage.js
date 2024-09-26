import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { FaUsers, FaBox, FaShoppingCart, FaWarehouse, FaSignOutAlt } from 'react-icons/fa';
import './css/ManageCategoriesPage.css'; // Assume a CSS file for styling

const ManageCategoriesPage = () => {
  const [categories, setCategories] = useState([]);

  // Fetch product categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://your-api-url.com/api/categories');
        setCategories(response.data);
      } catch (error) {
        alert('Failed to fetch categories');
      }
    };
    fetchCategories();
  }, []);

  // Toggle category activation status
  const toggleCategoryActivation = async (categoryId) => {
    try {
      const categoryToToggle = categories.find((category) => category.id === categoryId);
      const response = await axios.put(`http://your-api-url.com/api/categories/${categoryId}/toggle-activation`, {
        isActive: !categoryToToggle.isActive,
      });
      setCategories(categories.map((category) => (category.id === categoryId ? response.data : category)));
    } catch (error) {
      alert('Failed to toggle category status');
    }
  };

  return (
    <div className="manage-categories-container">
      {/* Header */}
      <header className="dashboard-header d-flex justify-content-between align-items-center">
        <h2>Manage Product Categories</h2>
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
      <div className="dashboard-main">
        <h2 className="mb-4 text-center">Manage Product Categories</h2>
        <Table striped bordered hover className="table-responsive">
          <thead className="thead-dark">
            <tr>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>{category.isActive ? 'Active' : 'Inactive'}</td>
                <td>
                  <Button
                    variant={category.isActive ? 'warning' : 'success'}
                    size="sm"
                    onClick={() => toggleCategoryActivation(category.id)}
                  >
                    {category.isActive ? 'Deactivate' : 'Activate'}
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

export default ManageCategoriesPage;
