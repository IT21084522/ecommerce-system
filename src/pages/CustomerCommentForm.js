import React, { useState } from 'react';
import axios from 'axios';

const CustomerCommentForm = ({ vendorId, onCommentAdded }) => {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  // Handle comment submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newComment = { rating, comment };
      await axios.post(`http://your-api-url.com/api/vendors/${vendorId}/comments`, newComment);
      setRating('');
      setComment('');
      onCommentAdded(); // Callback to update the comment list
    } catch (error) {
      alert('Failed to submit comment');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Rate Vendor</h3>
      <input
        type="number"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        placeholder="Rating (1-5)"
        min="1"
        max="5"
        required
      />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment"
        required
      />
      <button type="submit">Submit Comment</button>
    </form>
  );
};

export default CustomerCommentForm;
