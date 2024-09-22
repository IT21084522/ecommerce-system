import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
          axios.get('http://your-api-url.com/api/vendors'),
          axios.get('http://your-api-url.com/api/vendor-comments'),
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
      const response = await axios.post('http://your-api-url.com/api/vendors', newVendor);
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
    <div>
      <h1>Vendor Management</h1>

      {/* Vendor Creation Form */}
      <form onSubmit={handleCreateVendor}>
        <input
          type="text"
          value={vendorName}
          onChange={(e) => setVendorName(e.target.value)}
          placeholder="Vendor Name"
          required
        />
        <input
          type="email"
          value={vendorEmail}
          onChange={(e) => setVendorEmail(e.target.value)}
          placeholder="Vendor Email"
          required
        />
        <button type="submit">Create Vendor</button>
      </form>

      {/* Vendor List with Rankings and Comments */}
      <h2>Vendors</h2>
      <table>
        <thead>
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
              <td>{(customerComments[vendor.id] || []).reduce((acc, comment) => acc + comment.rating, 0) / (customerComments[vendor.id] || []).length || 0} / 5</td>
              <td>{renderCustomerComments(vendor.id)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorManagementPage;
