import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaUsers, FaBox, FaShoppingCart, FaWarehouse, FaSignOutAlt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DashboardPage.css'; // For custom CSS animations and styles

const DashboardPage = () => {
  const userName = localStorage.getItem('userName') || 'Admin'; // Assume userName is stored in localStorage

  const handleLogout = () => {
    // Handle logout logic (e.g., clear tokens, redirect to login page)
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header d-flex justify-content-between align-items-center">
        <h2>Welcome, {userName}!</h2>
        <Button variant="outline-danger" onClick={handleLogout}>
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

      {/* Main Dashboard Area */}
      <Container fluid className="dashboard-main">
        <Row>
          <Col md={6} lg={4} className="mb-4">
            <Card className="dashboard-card" onClick={() => window.location.href = '/users'}>
              <Card.Body>
                <FaUsers className="dashboard-icon" />
                <Card.Title>User Management</Card.Title>
                <Card.Text>Manage users, roles, and permissions.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4} className="mb-4">
            <Card className="dashboard-card" onClick={() => window.location.href = '/products'}>
              <Card.Body>
                <FaBox className="dashboard-icon" />
                <Card.Title>Product Management</Card.Title>
                <Card.Text>Create, update, or remove products.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4} className="mb-4">
            <Card className="dashboard-card" onClick={() => window.location.href = '/order-management'}>
              <Card.Body>
                <FaShoppingCart className="dashboard-icon" />
                <Card.Title>Order Management</Card.Title>
                <Card.Text>Track and manage customer orders.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4} className="mb-4">
            <Card className="dashboard-card" onClick={() => window.location.href = '/inventory'}>
              <Card.Body>
                <FaWarehouse className="dashboard-icon" />
                <Card.Title>Inventory Management</Card.Title>
                <Card.Text>Monitor stock and generate low-stock alerts.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>&copy; 2024 E-Commerce Admin Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DashboardPage;
