import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
      <Switch>
        <Route path="/login" component={LoginPage} />
        <PrivateRoute path="/dashboard" component={DashboardPage} />
        <PrivateRoute path="/users" component={UserManagementPage} roleRequired="Admin" />
        <PrivateRoute path="/products" component={ProductManagementPage} roleRequired="Vendor" />
        <PrivateRoute path="/customer-orders" component={CustomerOrderManagementPage} roleRequired="CSR" />
        <PrivateRoute path="/order-management" component={OrderManagementPage} roleRequired="Vendor" />
        <PrivateRoute path="/inventory" component={InventoryManagementPage} roleRequired="Vendor" />
        <PrivateRoute path="/vendors" component={VendorManagementPage} roleRequired="Admin" />
        <PrivateRoute path="/vendors/:vendorId/comments" component={CustomerCommentForm} roleRequired="Customer" />
      </Switch>
    </Router>
  );
}

export default App;
