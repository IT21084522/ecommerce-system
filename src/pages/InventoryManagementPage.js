import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { FaUsers, FaBox, FaShoppingCart, FaWarehouse, FaSignOutAlt } from 'react-icons/fa';
import './css/InventoryManagementPage.css'; // Assume you have a CSS file for styling

const InventoryManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [lowStockThreshold, setLowStockThreshold] = useState(10); // Set a threshold for low stock

  // Fetch inventory details for products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://your-api-url.com/api/products');
        setProducts(response.data);
      } catch (error) {
        alert('Failed to fetch products');
      }
    };
    fetchProducts();
  }, []);

  // Check if a product's stock is low
  const isLowStock = (product) => product.stock < lowStockThreshold;

  // Handle stock update when new products are added or sold
  const updateStock = async (productId, quantity) => {
    try {
      const response = await axios.put(`http://your-api-url.com/api/products/${productId}/update-stock`, { quantity });
      setProducts(products.map((product) => (product.id === productId ? response.data : product)));
    } catch (error) {
      alert('Failed to update stock');
    }
  };

  // Prevent removal of stock for pending orders
  const preventStockRemovalForPendingOrders = async (productId) => {
    try {
      const response = await axios.get(`http://your-api-url.com/api/orders/${productId}/pending`);
      if (response.data.hasPendingOrders) {
        alert('Cannot remove stock as there are pending orders for this product.');
      }
    } catch (error) {
      alert('Failed to check pending orders');
    }
  };

  // Send low stock alert to the vendor
  const sendLowStockAlert = async (product) => {
    try {
      await axios.post(`http://your-api-url.com/api/products/${product.id}/send-low-stock-alert`);
      alert(`Low stock alert sent for ${product.name}`);
    } catch (error) {
      alert('Failed to send low stock alert');
    }
  };

  return (
    <div className="inventorymanagement-container">
      {/* Header */}
      <header className="dashboard-header d-flex justify-content-between align-items-center">
        <h2>Inventory Management</h2>
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
        <h2 className="mb-4 text-center">Product Inventory</h2>
        <Table striped bordered hover className="table-responsive">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>{isLowStock(product) ? 'Low Stock' : 'In Stock'}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => {
                    if (isLowStock(product)) {
                      sendLowStockAlert(product);
                    } else {
                      alert('Stock is sufficient.');
                    }
                  }}>
                    Send Low Stock Alert
                  </Button>{' '}
                  <Button variant="info" size="sm" onClick={() => preventStockRemovalForPendingOrders(product.id)}>
                    Check Pending Orders
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

export default InventoryManagementPage;
