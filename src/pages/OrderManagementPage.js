import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderManagementPage = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get('http://your-api-url.com/api/orders');
      setOrders(response.data);
    };
    fetchOrders();
  }, []);

  // Update order status
  const handleUpdateStatus = async (orderId, status) => {
    try {
      await axios.put(`http://your-api-url.com/api/orders/${orderId}`, { status });
      setOrders(orders.map(order => (order.id === orderId ? { ...order, status } : order)));
    } catch (error) {
      alert('Failed to update order');
    }
  };

  return (
    <div>
      <h1>Order Management</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.status}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagementPage;
