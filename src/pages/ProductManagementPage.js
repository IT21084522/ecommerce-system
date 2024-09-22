import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [editingProduct, setEditingProduct] = useState(null); // Track product being edited

  // Fetch existing products
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
      const newProduct = { name, price, stock };
      const response = await axios.post('http://your-api-url.com/api/products', newProduct);
      setProducts([...products, response.data]);
      setName('');
      setPrice('');
      setStock('');
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
      const updatedProduct = { name, price, stock };
      const response = await axios.put(`http://your-api-url.com/api/products/${editingProduct.id}`, updatedProduct);
      setProducts(products.map((product) => (product.id === editingProduct.id ? response.data : product)));
      setEditingProduct(null); // Reset editing mode
      setName('');
      setPrice('');
      setStock('');
    } catch (error) {
      alert('Failed to update product');
    }
  };

  // Populate the form for editing
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price);
    setStock(product.stock);
  };

  return (
    <div>
      <h1>Product Management</h1>
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
        <button type="submit">{editingProduct ? 'Update Product' : 'Create Product'}</button>
      </form>

      <h2>Existing Products</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>
                <button onClick={() => handleEditProduct(product)}>Edit</button>
                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagementPage;
