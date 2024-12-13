import React from 'react';
import '../css/checkEvent.css';

export const CheckEvent = ({ isOpen, onClose, eventDetails }) => {
  if (!isOpen) return null; // Don't render modal if it's not open

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="container">
          <div className="event-details-card">
            <h2>{eventDetails.title}</h2>               {/* Event Title */}
            <p>Date: {eventDetails.date}</p>             {/* Event Date */}
            <p className="interested-count">Interested: {eventDetails.interested}</p>  {/* Interested Count */}
            <a href="#" className="back-btn" onClick={onClose}>Back to Dashboard</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckEvent;
