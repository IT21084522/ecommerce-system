import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerOrderManagementPage = () => {
  const [orders, setOrders] = useState([]);
  const [userRole, setUserRole] = useState('');

  // Fetch customer orders and determine the user role (CSR/Admin/Vendor)
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://your-api-url.com/api/orders');
        setOrders(response.data);
        const role = localStorage.getItem('role');
        setUserRole(role);
      } catch (error) {
        alert('Failed to fetch orders');
      }
    };
    fetchOrders();
  }, []);

  // Handle order cancellation by CSR/Admin
  const handleCancelOrder = async (orderId) => {
    try {
      await axios.put(`http://your-api-url.com/api/orders/${orderId}/cancel`);
      setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: 'Cancelled' } : order)));
    } catch (error) {
      alert('Failed to cancel order');
    }
  };

  // Handle marking a product as ready for delivery (Vendor only)
  const handleMarkProductAsReady = async (productId, orderId) => {
    try {
      await axios.put(`http://your-api-url.com/api/orders/${orderId}/products/${productId}/ready`);
      setOrders(orders.map((order) => {
        if (order.id === orderId) {
          return {
            ...order,
            products: order.products.map((product) => product.id === productId ? { ...product, status: 'Ready for Delivery' } : product),
          };
        }
        return order;
      }));
    } catch (error) {
      alert('Failed to mark product as ready for delivery');
    }
  };

  // Handle marking a product as delivered (Vendor only)
  const handleMarkProductAsDelivered = async (productId, orderId) => {
    try {
      await axios.put(`http://your-api-url.com/api/orders/${orderId}/products/${productId}/delivered`);
      setOrders(orders.map((order) => {
        if (order.id === orderId) {
          return {
            ...order,
            products: order.products.map((product) => product.id === productId ? { ...product, status: 'Delivered' } : product),
          };
        }
        return order;
      }));
    } catch (error) {
      alert('Failed to mark product as delivered');
    }
  };

  // Handle marking the full order as delivered (CSR/Admin only)
  const handleMarkOrderAsDelivered = async (orderId) => {
    try {
      await axios.put(`http://your-api-url.com/api/orders/${orderId}/delivered`);
      setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: 'Delivered' } : order)));
    } catch (error) {
      alert('Failed to mark order as fully delivered');
    }
  };

  return (
    <div>
      <h1>Customer Order Management</h1>

      <h2>Customer Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customerName}</td>
              <td>{order.status}</td>
              <td>
                {userRole === 'CSR' || userRole === 'Admin' ? (
                  <>
                    {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
                      <>
                        <button onClick={() => handleCancelOrder(order.id)}>Cancel Order</button>
                        <button onClick={() => handleMarkOrderAsDelivered(order.id)}>Mark Order as Delivered</button>
                      </>
                    )}
                    {order.status === 'Cancelled' && <span>Order Cancelled</span>}
                    {order.status === 'Delivered' && <span>Order Delivered</span>}
                  </>
                ) : (
                  <>
                    {order.products.map((product) => (
                      <div key={product.id}>
                        <p>{product.name} - {product.status}</p>
                        {product.status === 'Processing' && (
                          <button onClick={() => handleMarkProductAsReady(product.id, order.id)}>
                            Mark as Ready for Delivery
                          </button>
                        )}
                        {product.status === 'Ready for Delivery' && (
                          <button onClick={() => handleMarkProductAsDelivered(product.id, order.id)}>
                            Mark as Delivered
                          </button>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerOrderManagementPage;
