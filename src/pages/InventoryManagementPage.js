import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InventoryManagementPage = () => {
  const [inventory, setInventory] = useState([]);

  // Fetch inventory data
  useEffect(() => {
    const fetchInventory = async () => {
      const response = await axios.get('http://your-api-url.com/api/inventory');
      setInventory(response.data);
    };
    fetchInventory();
  }, []);

  return (
    <div>
      <h1>Inventory Management</h1>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Stock Level</th>
            <th>Low Stock Alert</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td>{item.productName}</td>
              <td>{item.stockLevel}</td>
              <td>{item.stockLevel < 10 ? 'Low Stock' : 'In Stock'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryManagementPage;
