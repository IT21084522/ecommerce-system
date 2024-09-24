import React, { useState } from 'react';
import axios from 'axios';

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
  );
};

export default AddProductPage;
