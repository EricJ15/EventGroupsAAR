import React, { useState } from 'react';
import { ref, update } from 'firebase/database';
import { db } from '../firebase/config';
import '../css/modal.css';

export default function AdminEdit({ isOpen, onClose, event }) {
  const [formData, setFormData] = useState({
    title: event.title,
    description: event.description,
    date: event.date,
    imageUrl: event.imageUrl || '',
    isPublic: event.isPublic
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const eventRef = ref(db, `events/${event.id}`);
      await update(eventRef, formData);
      onClose();
    } catch (error) {
      console.error("Error updating event: ", error);
      alert('Failed to update event. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>Edit Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Image URL:</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="isPublic"
                checked={formData.isPublic}
                onChange={handleChange}
              />
              Public Event
            </label>
          </div>
          <div className="form-actions">
            <button type="submit" className="save-btn">Save Changes</button>
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
