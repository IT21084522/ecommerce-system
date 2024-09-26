import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Table, Form } from 'react-bootstrap';
import { FaEdit, FaTrash, FaCheckCircle, FaTimesCircle, FaUsers, FaBox, FaShoppingCart, FaWarehouse, FaSignOutAlt } from 'react-icons/fa';
import './css/OrderManagementPage.css';

const OrderManagementPage = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]); 
  const [vendors, setVendors] = useState([]); 
  const [customerName, setCustomerName] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedVendor, setSelectedVendor] = useState('');
  const [quantity, setQuantity] = useState('');
  const [editingOrder, setEditingOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userRole, setUserRole] = useState(''); 

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
        const role = localStorage.getItem('role');
        setUserRole(role);
      } catch (error) {
        alert('Failed to fetch data');
      }
    };
    fetchData();
  }, []);

  const handleShowModal = (order = null) => {
    if (order) {
      handleEditOrder(order);
    } else {
      resetForm();
    }
    setShowModal(true);
  };
  
  const handleCloseModal = () => setShowModal(false);

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    try {
      const newOrder = {
        customerName,
        productId: selectedProduct,
        vendorId: selectedVendor,
        quantity,
        status: 'Processing',
      };
      const response = await axios.post('http://your-api-url.com/api/orders', newOrder);
      setOrders([...orders, response.data]);
      handleCloseModal();
    } catch (error) {
      alert('Failed to create order');
    }
  };

  const handleUpdateOrder = async (e) => {
    e.preventDefault();
    try {
      const updatedOrder = {
        customerName,
        productId: selectedProduct,
        vendorId: selectedVendor,
        quantity,
        status: 'Processing',
      };
      const response = await axios.put(`http://your-api-url.com/api/orders/${editingOrder.id}`, updatedOrder);
      setOrders(orders.map((order) => (order.id === editingOrder.id ? response.data : order)));
      setEditingOrder(null);
      handleCloseModal();
    } catch (error) {
      alert('Failed to update order');
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await axios.put(`http://your-api-url.com/api/orders/${orderId}/cancel`);
      setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: 'Cancelled' } : order)));
    } catch (error) {
      alert('Failed to cancel order');
    }
  };

  const handlePartialDelivery = async (orderId) => {
    if (userRole !== 'Vendor') return;
    try {
      await axios.put(`http://your-api-url.com/api/orders/${orderId}/partial-delivery`);
      setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: 'Partially Delivered' } : order)));
    } catch (error) {
      alert('Failed to update partial delivery');
    }
  };

  const handleMarkAsDelivered = async (orderId) => {
    if (userRole === 'CSR' || userRole === 'Admin') {
      try {
        await axios.put(`http://your-api-url.com/api/orders/${orderId}/delivered`);
        setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: 'Delivered' } : order)));
      } catch (error) {
        alert('Failed to mark order as delivered');
      }
    }
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setCustomerName(order.customerName);
    setSelectedProduct(order.productId);
    setSelectedVendor(order.vendorId);
    setQuantity(order.quantity);
  };

  const resetForm = () => {
    setCustomerName('');
    setSelectedProduct('');
    setSelectedVendor('');
    setQuantity('');
  };

  return (
    <div className="ordermanagement-container">
      {/* Header */}
      <header className="dashboard-header d-flex justify-content-between align-items-center">
        <h2>Order Management</h2>
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
            <li><a href="/customer-orders"><FaShoppingCart className="sidebar-icon" /> <span>Customer Order Management</span></a></li>
            <li><a href="/vendors"><FaUsers className="sidebar-icon" /> <span>Vendor Management</span></a></li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        <h2 className="text-center mb-4">Existing Orders</h2>
        <div className="text-center mb-3">
          <Button variant="primary" onClick={() => handleShowModal()}>
            Create New Order
          </Button>
        </div>

        <Table striped bordered hover>
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
                      {userRole === 'Vendor' && (
                        <>
                          <Button variant="info" size="sm" onClick={() => handleShowModal(order)}>
                            <FaEdit /> Edit
                          </Button>{' '}
                          <Button variant="danger" size="sm" onClick={() => handleCancelOrder(order.id)}>
                            <FaTrash /> Cancel
                          </Button>{' '}
                          {order.status === 'Processing' && (
                            <Button variant="warning" size="sm" onClick={() => handlePartialDelivery(order.id)}>
                              Mark as Partially Delivered
                            </Button>
                          )}
                        </>
                      )}
                      {userRole === 'CSR' || userRole === 'Admin' ? (
                        order.status === 'Partially Delivered' && (
                          <Button variant="success" size="sm" onClick={() => handleMarkAsDelivered(order.id)}>
                            <FaCheckCircle /> Mark as Delivered
                          </Button>
                        )
                      ) : null}
                    </>
                  )}
                  {order.status === 'Cancelled' && (
                    <span className="text-danger">
                      <FaTimesCircle /> Order Cancelled
                    </span>
                  )}
                  {order.status === 'Delivered' && (
                    <span className="text-success">
                      <FaCheckCircle /> Order Delivered
                    </span>
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

      {/* Modal for creating/updating orders */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingOrder ? 'Edit Order' : 'Create New Order'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={editingOrder ? handleUpdateOrder : handleCreateOrder}>
            <Form.Group controlId="formCustomerName" className="mb-3">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter customer name"
                required
              />
            </Form.Group>

            <Form.Group controlId="formProduct" className="mb-3">
              <Form.Label>Product</Form.Label>
              <Form.Control
                as="select"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                required
              >
                <option value="">Select Product</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formVendor" className="mb-3">
              <Form.Label>Vendor</Form.Label>
              <Form.Control
                as="select"
                value={selectedVendor}
                onChange={(e) => setSelectedVendor(e.target.value)}
                required
              >
                <option value="">Select Vendor</option>
                {vendors.map((vendor) => (
                  <option key={vendor.id} value={vendor.id}>
                    {vendor.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formQuantity" className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity"
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              {editingOrder ? 'Update Order' : 'Create Order'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default OrderManagementPage;
