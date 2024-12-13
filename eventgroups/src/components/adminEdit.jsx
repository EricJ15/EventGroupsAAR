import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/adminEdit.css';

export const AdminEdit = () => {
  const navigate = useNavigate(); // Hook to handle navigation

  const handleCancel = () => {
    navigate('/'); // Navigate back to AdminDash
  };

  return (
    <div>
      <div className="header">
        <h1>Edit Event</h1>
        <button>Log Out</button>
      </div>
      <div className="container">
        <div className="form-container">
          <h2>Edit Event Details</h2>
          <form>
            <div className="form-group">
              <label htmlFor="event-title">Event Title</label>
              <input type="text" id="event-title" name="event-title" defaultValue="Music Concert" />
            </div>
            <div className="form-group">
              <label htmlFor="event-description">Event Description</label>
              <textarea
                id="event-description"
                name="event-description"
                rows="4"
                defaultValue="Join us for an evening of live music and entertainment."
              />
            </div>
            <div className="form-group">
              <label htmlFor="event-date">Event Date</label>
              <input type="date" id="event-date" name="event-date" defaultValue="2023-12-25" />
            </div>
            <div className="form-group">
              <label htmlFor="event-image">Event Image URL</label>
              <input
                type="text"
                id="event-image"
                name="event-image"
                defaultValue="https://storage.googleapis.com/a1aa/image/EnBnyzhSRoZKMNuvTCAfZY5QFt1yTYeBhUOM7491aJhuGa6TA.jpg"
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="save-btn">
                Save
              </button>
              <button type="button" className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminEdit;
