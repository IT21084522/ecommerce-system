import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageCategoriesPage = () => {
  const [categories, setCategories] = useState([]);

  // Fetch product categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://your-api-url.com/api/categories');
        setCategories(response.data);
      } catch (error) {
        alert('Failed to fetch categories');
      }
    };
    fetchCategories();
  }, []);

  // Toggle category activation status
  const toggleCategoryActivation = async (categoryId) => {
    try {
      const categoryToToggle = categories.find((category) => category.id === categoryId);
      const response = await axios.put(`http://your-api-url.com/api/categories/${categoryId}/toggle-activation`, {
        isActive: !categoryToToggle.isActive,
      });
      setCategories(categories.map((category) => (category.id === categoryId ? response.data : category)));
    } catch (error) {
      alert('Failed to toggle category status');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Manage Product Categories</h2>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>{category.isActive ? 'Active' : 'Inactive'}</td>
              <td>
                <button
                  className={`btn ${category.isActive ? 'btn-warning' : 'btn-success'} btn-sm`}
                  onClick={() => toggleCategoryActivation(category.id)}
                >
                  {category.isActive ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCategoriesPage;
