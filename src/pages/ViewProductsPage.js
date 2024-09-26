import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUsers, FaBox, FaShoppingCart, FaWarehouse, FaSignOutAlt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/ViewProductsPage.css'; // Custom CSS for additional styling

const ViewProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [isActive, setIsActive] = useState(true);

  // Fetch existing products from the API
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

  // Handle product update
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = { name, price, stock, category, isActive };
      const response = await axios.put(`http://your-api-url.com/api/products/${editingProduct.id}`, updatedProduct);
      setProducts(products.map((product) => (product.id === editingProduct.id ? response.data : product)));
      setEditingProduct(null);
      resetForm();
    } catch (error) {
      alert('Failed to update product');
    }
  };

  // Handle product deletion
  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://your-api-url.com/api/products/${productId}`);
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      alert('Failed to delete product');
    }
  };

  // Populate form fields for editing a product
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price);
    setStock(product.stock);
    setCategory(product.category);
    setIsActive(product.isActive);
  };

  // Reset the form fields
  const resetForm = () => {
    setName('');
    setPrice('');
    setStock('');
    setCategory('');
    setIsActive(true);
  };

  return (
    <div className="view-products-container">
      {/* Header */}
      <header className="dashboard-header d-flex justify-content-between align-items-center">
        <h2>View and Manage Products</h2>
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
          <h2 className="mb-4 text-center">Existing Products</h2>
          {editingProduct && (
            <form onSubmit={handleUpdateProduct} className="mb-5">
              <h4>Edit Product</h4>
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
              <button type="submit" className="btn btn-success w-100">Update Product</button>
              <button type="button" className="btn btn-secondary w-100 mt-2" onClick={() => setEditingProduct(null)}>
                Cancel
              </button>
            </form>
          )}
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Category</th>
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
                  <td>{product.category}</td>
                  <td>{product.isActive ? 'Active' : 'Inactive'}</td>
                  <td>
                    <button className="btn btn-primary btn-sm mr-2" onClick={() => handleEditProduct(product)}>
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteProduct(product.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>&copy; 2024 E-Commerce Admin Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ViewProductsPage;
