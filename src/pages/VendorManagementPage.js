import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form } from 'react-bootstrap';
import { FaUsers, FaBox, FaShoppingCart, FaWarehouse, FaSignOutAlt } from 'react-icons/fa';
import './css/VendorManagementPage.css'; // Assume you have a CSS file for styling

const VendorManagementPage = () => {
  const [vendors, setVendors] = useState([]);
  const [vendorName, setVendorName] = useState('');
  const [vendorEmail, setVendorEmail] = useState('');
  const [customerComments, setCustomerComments] = useState({});

  // Fetch existing vendors and customer comments
  useEffect(() => {
    const fetchVendorsAndComments = async () => {
      try {
        const [vendorResponse, commentResponse] = await Promise.all([
          axios.get('http://your-api-url.com/vendors'),
          axios.get('http://your-api-url.com/vendor-comments'),
        ]);
        setVendors(vendorResponse.data);
        setCustomerComments(commentResponse.data);
      } catch (error) {
        alert('Failed to fetch vendors or comments');
      }
    };
    fetchVendorsAndComments();
  }, []);

  // Handle vendor creation
  const handleCreateVendor = async (e) => {
    e.preventDefault();
    try {
      const newVendor = { name: vendorName, email: vendorEmail };
      const response = await axios.post('http://your-api-url.com/vendors', newVendor);
      setVendors([...vendors, response.data]);
      setVendorName('');
      setVendorEmail('');
    } catch (error) {
      alert('Failed to create vendor');
    }
  };

  // Render customer comments and ratings for a vendor
  const renderCustomerComments = (vendorId) => {
    const comments = customerComments[vendorId] || [];
    return comments.map((comment, index) => (
      <div key={index}>
        <p>Rating: {comment.rating} / 5</p>
        <p>{comment.comment}</p>
        <hr />
      </div>
    ));
  };

  return (
    <div className="vendormanagement-container">
      {/* Header */}
      <header className="dashboard-header d-flex justify-content-between align-items-center">
        <h2>Vendor Management</h2>
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
        <h2 className="text-center mb-4">Vendors</h2>

        {/* Vendor Creation Form */}
        <div className="vendor-form-container">
          <Form onSubmit={handleCreateVendor}>
            <Form.Group controlId="vendorName" className="mb-3">
              <Form.Label>Vendor Name</Form.Label>
              <Form.Control
                type="text"
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
                placeholder="Enter vendor name"
                required
              />
            </Form.Group>
            <Form.Group controlId="vendorEmail" className="mb-3">
              <Form.Label>Vendor Email</Form.Label>
              <Form.Control
                type="email"
                value={vendorEmail}
                onChange={(e) => setVendorEmail(e.target.value)}
                placeholder="Enter vendor email"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Create Vendor
            </Button>
          </Form>
        </div>

        {/* Vendor List with Rankings and Comments */}
        <Table striped bordered hover className="mt-4">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Ranking</th>
              <th>Customer Comments</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor) => (
              <tr key={vendor.id}>
                <td>{vendor.name}</td>
                <td>{vendor.email}</td>
                <td>
                  {(customerComments[vendor.id] || []).reduce((acc, comment) => acc + comment.rating, 0) /
                  (customerComments[vendor.id] || []).length || 0} / 5
                </td>
                <td>{renderCustomerComments(vendor.id)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>&copy; 2024 E-Commerce Admin Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default VendorManagementPage;
