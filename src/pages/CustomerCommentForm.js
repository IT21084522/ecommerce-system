import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
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
    <Form onSubmit={handleSubmit} className="comment-form">
      <h3 className="mb-4 text-center">Rate Vendor</h3>
      <Form.Group controlId="rating" className="mb-3">
        <Form.Label>Rating (1-5)</Form.Label>
        <Form.Control
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          placeholder="Enter rating"
          min="1"
          max="5"
          required
        />
      </Form.Group>
      <Form.Group controlId="comment" className="mb-3">
        <Form.Label>Comment</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment"
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="w-100">
        Submit Comment
      </Button>
    </Form>
  );
};

export default CustomerCommentForm;
