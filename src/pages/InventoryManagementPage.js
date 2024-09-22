import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div>
      <h1>Inventory Management</h1>

      <h2>Product Inventory</h2>
      <table>
        <thead>
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
                <button
                  onClick={() => {
                    if (isLowStock(product)) {
                      sendLowStockAlert(product);
                    } else {
                      alert('Stock is sufficient.');
                    }
                  }}
                >
                  Send Low Stock Alert
                </button>
                <button onClick={() => preventStockRemovalForPendingOrders(product.id)}>
                  Check Pending Orders
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryManagementPage;
