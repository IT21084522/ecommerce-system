import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductManagementDashboard = () => {
  return (
    <div className="container mt-5">
      <div className="row text-center">
        <h1 className="mb-4">Product Management Dashboard</h1>
        
        <div className="col-md-4">
          <div className="card shadow-lg p-4 mb-4 bg-white">
            <h3>Add New Product</h3>
            <p>Create a new product listing with details like price, stock, and category.</p>
            <Link to="/products/add" className="btn btn-primary w-100">Add Product</Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-lg p-4 mb-4 bg-white">
            <h3>View Existing Products</h3>
            <p>View, update, or delete existing product listings.</p>
            <Link to="/products/view" className="btn btn-primary w-100">View Products</Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-lg p-4 mb-4 bg-white">
            <h3>Manage Categories</h3>
            <p>Activate or deactivate product categories.</p>
            <Link to="/products/categories" className="btn btn-primary w-100">Manage Categories</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManagementDashboard;
