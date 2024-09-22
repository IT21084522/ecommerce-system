import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import UserManagementPage from './pages/UserManagementPage';
import ProductManagementPage from './pages/ProductManagementPage';
import VendorManagementPage from './pages/VendorManagementPage';
import CustomerCommentForm from './pages/CustomerCommentForm';
import PrivateRoute from './components/PrivateRoute';
import InventoryManagementPage from './pages/InventoryManagementPage';
import CustomerOrderManagementPage from './pages/CustomerOrderManagementPage';
import OrderManagementPage from './pages/OrderManagementPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <PrivateRoute path="/dashboard" element={<DashboardPage />} />
        <PrivateRoute path="/users" element={<UserManagementPage />} roleRequired="Admin" />
        <PrivateRoute path="/products" element={<ProductManagementPage />} roleRequired="Vendor" />
        <PrivateRoute path="/customer-orders" element={<CustomerOrderManagementPage />} roleRequired="CSR" />
        <PrivateRoute path="/order-management" element={<OrderManagementPage />} roleRequired="Vendor" />
        <PrivateRoute path="/inventory" element={<InventoryManagementPage />} roleRequired="Vendor" />
        <PrivateRoute path="/vendors" element={<VendorManagementPage />} roleRequired="Admin" />
        <PrivateRoute path="/vendors/:vendorId/comments" element={<CustomerCommentForm />} roleRequired="Customer" />
      </Routes>
    </Router>
  );
}

export default App;
