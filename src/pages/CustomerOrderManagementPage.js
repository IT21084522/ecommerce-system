import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal } from 'react-bootstrap';
import { FaCheckCircle, FaTimesCircle, FaTruck, FaTrash, FaUsers, FaBox, FaShoppingCart, FaWarehouse, FaSignOutAlt } from 'react-icons/fa';
import './CustomerOrderManagementPage.css';

const CustomerOrderManagementPage = () => {
  const [orders, setOrders] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showDeliveredModal, setShowDeliveredModal] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);

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
  const handleCancelOrder = async () => {
    try {
      await axios.put(`http://your-api-url.com/api/orders/${currentOrderId}/cancel`);
      setOrders(orders.map((order) => (order.id === currentOrderId ? { ...order, status: 'Cancelled' } : order)));
      setShowCancelModal(false);
    } catch (error) {
      alert('Failed to cancel order');
    }
  };

  // Handle marking the full order as delivered (CSR/Admin only)
  const handleMarkOrderAsDelivered = async () => {
    try {
      await axios.put(`http://your-api-url.com/api/orders/${currentOrderId}/delivered`);
      setOrders(orders.map((order) => (order.id === currentOrderId ? { ...order, status: 'Delivered' } : order)));
      setShowDeliveredModal(false);
    } catch (error) {
      alert('Failed to mark order as fully delivered');
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

  // Show modals for confirming actions
  const openCancelModal = (orderId) => {
    setCurrentOrderId(orderId);
    setShowCancelModal(true);
  };

  const openDeliveredModal = (orderId) => {
    setCurrentOrderId(orderId);
    setShowDeliveredModal(true);
  };

  return (
    <div className="customerordermanagement-container">
      {/* Header */}
      <header className="dashboard-header d-flex justify-content-between align-items-center">
        <h2>Customer Order Management</h2>
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
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        <h2 className="text-center mb-4">Customer Orders</h2>
        <Table striped bordered hover className="table-responsive">
          <thead className="thead-dark">
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
                          <Button variant="danger" size="sm" onClick={() => openCancelModal(order.id)}>
                            <FaTrash /> Cancel Order
                          </Button>{' '}
                          <Button variant="success" size="sm" onClick={() => openDeliveredModal(order.id)}>
                            <FaCheckCircle /> Mark as Delivered
                          </Button>
                        </>
                      )}
                      {order.status === 'Cancelled' && <span className="text-danger"><FaTimesCircle /> Order Cancelled</span>}
                      {order.status === 'Delivered' && <span className="text-success"><FaCheckCircle /> Order Delivered</span>}
                    </>
                  ) : (
                    <>
                      {order.products.map((product) => (
                        <div key={product.id} className="mb-2">
                          <p><strong>{product.name}</strong> - {product.status}</p>
                          {product.status === 'Processing' && (
                            <Button variant="warning" size="sm" onClick={() => handleMarkProductAsReady(product.id, order.id)}>
                              <FaTruck /> Mark as Ready for Delivery
                            </Button>
                          )}
                          {product.status === 'Ready for Delivery' && (
                            <Button variant="success" size="sm" onClick={() => handleMarkProductAsDelivered(product.id, order.id)}>
                              <FaCheckCircle /> Mark as Delivered
                            </Button>
                          )}
                        </div>
                      ))}
                    </>
                  )}
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

      {/* Modal for confirming order cancellation */}
      <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Cancellation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to cancel this order?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={handleCancelOrder}>
            Cancel Order
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for confirming order delivered */}
      <Modal show={showDeliveredModal} onHide={() => setShowDeliveredModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delivery</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure this order has been fully delivered?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeliveredModal(false)}>
            Close
          </Button>
          <Button variant="success" onClick={handleMarkOrderAsDelivered}>
            Mark as Delivered
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CustomerOrderManagementPage;
