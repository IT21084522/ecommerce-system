import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderManagementPage = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]); // Available products for creating new orders
  const [vendors, setVendors] = useState([]); // Available vendors for multi-vendor orders
  const [customerName, setCustomerName] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedVendor, setSelectedVendor] = useState('');
  const [quantity, setQuantity] = useState('');
  const [editingOrder, setEditingOrder] = useState(null);

  // Fetch orders, products, and vendors from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [orderResponse, productResponse, vendorResponse] = await Promise.all([
          axios.get('http://your-api-url.com/api/orders'),
          axios.get('http://your-api-url.com/api/products'),
          axios.get('http://your-api-url.com/api/vendors'),
        ]);
        setOrders(orderResponse.data);
        setProducts(productResponse.data);
        setVendors(vendorResponse.data);
      } catch (error) {
        alert('Failed to fetch data');
      }
    };
    fetchData();
  }, []);

  // Handle order creation
  const handleCreateOrder = async (e) => {
    e.preventDefault();
    try {
      const newOrder = {
        customerName,
        productId: selectedProduct,
        vendorId: selectedVendor,
        quantity,
        status: 'Processing', // Initial status is "Processing"
      };
      const response = await axios.post('http://your-api-url.com/api/orders', newOrder);
      setOrders([...orders, response.data]);
      resetForm();
    } catch (error) {
      alert('Failed to create order');
    }
  };

  // Handle order update (before dispatch)
  const handleUpdateOrder = async (e) => {
    e.preventDefault();
    try {
      const updatedOrder = {
        customerName,
        productId: selectedProduct,
        vendorId: selectedVendor,
        quantity,
        status: 'Processing', // Status remains "Processing" before dispatch
      };
      const response = await axios.put(`http://your-api-url.com/api/orders/${editingOrder.id}`, updatedOrder);
      setOrders(orders.map((order) => (order.id === editingOrder.id ? response.data : order)));
      setEditingOrder(null);
      resetForm();
    } catch (error) {
      alert('Failed to update order');
    }
  };

  // Handle order cancellation (before dispatch)
  const handleCancelOrder = async (orderId) => {
    try {
      await axios.put(`http://your-api-url.com/api/orders/${orderId}/cancel`);
      setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: 'Cancelled' } : order)));
    } catch (error) {
      alert('Failed to cancel order');
    }
  };

  // Handle partial delivery for multi-vendor orders
  const handlePartialDelivery = async (orderId) => {
    try {
      await axios.put(`http://your-api-url.com/api/orders/${orderId}/partial-delivery`);
      setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: 'Partially Delivered' } : order)));
    } catch (error) {
      alert('Failed to update partial delivery');
    }
  };

  // Handle marking an order as fully delivered
  const handleMarkAsDelivered = async (orderId) => {
    try {
      await axios.put(`http://your-api-url.com/api/orders/${orderId}/delivered`);
      setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: 'Delivered' } : order)));
    } catch (error) {
      alert('Failed to mark order as delivered');
    }
  };

  // Populate the form fields for editing an order
  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setCustomerName(order.customerName);
    setSelectedProduct(order.productId);
    setSelectedVendor(order.vendorId);
    setQuantity(order.quantity);
  };

  // Reset the form fields
  const resetForm = () => {
    setCustomerName('');
    setSelectedProduct('');
    setSelectedVendor('');
    setQuantity('');
  };

  return (
    <div>
      <h1>Order Management</h1>

      {/* Order Creation/Update Form */}
      <form onSubmit={editingOrder ? handleUpdateOrder : handleCreateOrder}>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Customer Name"
          required
        />
        <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)} required>
          <option value="">Select Product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
        <select value={selectedVendor} onChange={(e) => setSelectedVendor(e.target.value)} required>
          <option value="">Select Vendor</option>
          {vendors.map((vendor) => (
            <option key={vendor.id} value={vendor.id}>
              {vendor.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
          required
        />
        <button type="submit">{editingOrder ? 'Update Order' : 'Create Order'}</button>
      </form>

      {/* Existing Orders Table */}
      <h2>Existing Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Vendor</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customerName}</td>
              <td>{order.productId}</td>
              <td>{order.vendorId}</td>
              <td>{order.quantity}</td>
              <td>{order.status}</td>
              <td>
                {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
                  <>
                    <button onClick={() => handleEditOrder(order)}>Edit</button>
                    <button onClick={() => handleCancelOrder(order.id)}>Cancel</button>
                    {order.status === 'Processing' && (
                      <button onClick={() => handlePartialDelivery(order.id)}>Mark as Partially Delivered</button>
                    )}
                    {order.status === 'Partially Delivered' && (
                      <button onClick={() => handleMarkAsDelivered(order.id)}>Mark as Delivered</button>
                    )}
                  </>
                )}
                {order.status === 'Cancelled' && <span>Order Cancelled</span>}
                {order.status === 'Delivered' && <span>Order Delivered</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagementPage;
