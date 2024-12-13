import React, { useState } from 'react';
import CheckEvent from './CheckEvent'; // Import the CheckEvent modal
import '../css/admindash.css';

export default function AdminDash() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const eventDetails = {
    title: "Music Concert",
    date: "25th December 2023",
    interested: 123,  // Example interested count
  };

  const handleCheckEvent = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div>
      <div className="header">
        <div className="title">Events Admin Dashboard</div>
        <button className="logout-button">Log Out</button>
      </div>

      <div className="container">
        <div className="event">
          <img
            alt="Image of a music concert with a large crowd and stage lighting"
            height="150"
            src="https://storage.googleapis.com/a1aa/image/ejtPWCWie9ijDkfORYEL16c55I6HQkHXJTJxYZejF85n7YpPB.jpg"
            width="150"
          />
          <div className="event-details">
            <h2 className="event-title">{eventDetails.title}</h2>
            <p className="event-description">Join us for an evening of live music and entertainment.</p>
            <p className="event-date">Date: {eventDetails.date}</p>

            <div className="event-actions">
              <button className="Check" onClick={handleCheckEvent}>Check Event</button>
            </div>
          </div>

          <div className="admin-actions">
            <button className="edit-btn">Edit</button>
            <button className="delete-btn delete">Delete</button>
          </div>
        </div>
      </div>

      {/* The CheckEvent modal is shown when isModalOpen is true */}
      <CheckEvent
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        eventDetails={eventDetails}
      />
    </div>
  );
}
