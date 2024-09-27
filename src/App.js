import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import UserManagementPage from './pages/UserManagementPage';
import ProductManagementDashboard from './pages/ProductManagementDashboard'; // New Dashboard
import AddProductPage from './pages/AddProductPage'; // Add Product Page
import ViewProductsPage from './pages/ViewProductsPage'; // View Products Page
import ManageCategoriesPage from './pages/ManageCategoriesPage'; // Manage Categories Page
import VendorManagementPage from './pages/VendorManagementPage';
import CustomerCommentForm from './pages/CustomerCommentForm';
import PrivateRoute from './components/PrivateRoute';
import InventoryManagementPage from './pages/InventoryManagementPage';
import CustomerOrderManagementPage from './pages/CustomerOrderManagementPage';
import OrderManagementPage from './pages/OrderManagementPage';

// New Customer Management Components
import CustomerManagementDashboard from './pages/CustomerManagementDashboard';
import CustomerAccountActivationRequests from './pages/CustomerAccountActivationRequests';
import DeactivatedAccountReactivation from './pages/DeactivatedAccountReactivation';

function App() {
  return (
    <Router>
      {/* <Routes>
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
            <ProductManagementDashboard />
          </PrivateRoute>
        } />

        <Route path="/products/add" element={
          <PrivateRoute roleRequired="Vendor">
            <AddProductPage />
          </PrivateRoute>
        } />

        <Route path="/products/view" element={
          <PrivateRoute roleRequired="Vendor">
            <ViewProductsPage />
          </PrivateRoute>
        } />

        <Route path="/products/categories" element={
          <PrivateRoute roleRequired="Vendor">
            <ManageCategoriesPage />
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

        <Route path="/customer-management" element={
          <PrivateRoute roleRequired="CSR">
            <CustomerManagementDashboard />
          </PrivateRoute>
        } />

        <Route path="/customer-account-activation" element={
          <PrivateRoute roleRequired="CSR">
            <CustomerAccountActivationRequests />
          </PrivateRoute>
        } />

        <Route path="/deactivated-account-reactivation" element={
          <PrivateRoute roleRequired="CSR">
            <DeactivatedAccountReactivation />
          </PrivateRoute>
        } />
      </Routes> */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/users" element={<UserManagementPage />} />
        <Route path="/products" element={<ProductManagementDashboard />} />
        <Route path="/products/add" element={<AddProductPage />} />
        <Route path="/products/view" element={<ViewProductsPage />} />
        <Route path="/products/categories" element={<ManageCategoriesPage />} />
        <Route path="/customer-orders" element={<CustomerOrderManagementPage />} />
        <Route path="/order-management" element={<OrderManagementPage />} />
        <Route path="/inventory" element={<InventoryManagementPage />} />
        <Route path="/vendors" element={<VendorManagementPage />} />
        <Route path="/vendors/:vendorId/comments" element={<CustomerCommentForm />} />
        <Route path="/customer-management" element={<CustomerManagementDashboard />} />
        <Route path="/customer-account-activation" element={<CustomerAccountActivationRequests />} />
        <Route path="/deactivated-account-reactivation" element={<DeactivatedAccountReactivation />} />
      </Routes>
    </Router>
  );
}

export default App;
