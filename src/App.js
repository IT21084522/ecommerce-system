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
        
        <Route path="/dashboard" element={
          <PrivateRoute roleRequired="Admin">
            <DashboardPage />
          </PrivateRoute>
        } />

        <Route path="/users" element={
          <PrivateRoute roleRequired="Admin">
            <UserManagementPage />
          </PrivateRoute>
        } />

        <Route path="/products" element={
          <PrivateRoute roleRequired="Vendor">
            <ProductManagementPage />
          </PrivateRoute>
        } />

        <Route path="/customer-orders" element={
          <PrivateRoute roleRequired="CSR">
            <CustomerOrderManagementPage />
          </PrivateRoute>
        } />

        <Route path="/order-management" element={
          <PrivateRoute roleRequired="Vendor">
            <OrderManagementPage />
          </PrivateRoute>
        } />

        <Route path="/inventory" element={
          <PrivateRoute roleRequired="Vendor">
            <InventoryManagementPage />
          </PrivateRoute>
        } />

        <Route path="/vendors" element={
          <PrivateRoute roleRequired="Admin">
            <VendorManagementPage />
          </PrivateRoute>
        } />

        <Route path="/vendors/:vendorId/comments" element={
          <PrivateRoute roleRequired="Customer">
            <CustomerCommentForm />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
