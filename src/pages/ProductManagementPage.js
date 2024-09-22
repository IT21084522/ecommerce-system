import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [isActive, setIsActive] = useState(true); // To track the status of the product
  const [editingProduct, setEditingProduct] = useState(null);

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

  // Handle product creation
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const newProduct = { name, price, stock, category, isActive };
      const response = await axios.post('http://your-api-url.com/api/products', newProduct);
      setProducts([...products, response.data]);
      resetForm();
    } catch (error) {
      alert('Failed to create product');
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

  // Toggle product activation status
  const toggleActivation = async (productId) => {
    try {
      const productToToggle = products.find((product) => product.id === productId);
      const response = await axios.put(`http://your-api-url.com/api/products/${productId}/toggle-activation`, {
        isActive: !productToToggle.isActive,
      });
      setProducts(products.map((product) => (product.id === productId ? response.data : product)));
    } catch (error) {
      alert('Failed to toggle product status');
    }
  };

  return (
    <div>
      <h1>Product Management</h1>

      {/* Product Creation/Update Form */}
      <form onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
        />
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="Stock"
          required
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          required
        />
        <label>
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          Active
        </label>
        <button type="submit">{editingProduct ? 'Update Product' : 'Create Product'}</button>
      </form>

      {/* Existing Products Table */}
      <h2>Existing Products</h2>
      <table>
        <thead>
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
                <button onClick={() => handleEditProduct(product)}>Edit</button>
                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                <button onClick={() => toggleActivation(product.id)}>
                  {product.isActive ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagementPage;
