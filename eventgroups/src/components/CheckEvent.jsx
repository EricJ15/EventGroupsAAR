import React from 'react';
import '../css/modal.css';

export default function CheckEvent({ isOpen, onClose, eventDetails }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <h2>{eventDetails.title}</h2>
        <p>{eventDetails.description}</p>
        <p>Date: {eventDetails.date}</p>
        {eventDetails.interested && (
          <p>Interested: {eventDetails.interested}</p>
        )}
      </div>
    </div>
  );
}
