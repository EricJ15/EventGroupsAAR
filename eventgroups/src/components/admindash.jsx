import React from 'react';
import '../css/admin.css';

export default function AdminDash() {
  return (
    <div>
      <div className="header">
        Admin Dashboard
      </div>
      <div className="container">
        <div className="admin-actions">
          <button id="add-event-btn">Add Event</button>
        </div>
        <div className="event">
          <img
            alt="Image of a music concert with a large crowd and stage lighting"
            height="150"
            src="https://storage.googleapis.com/a1aa/image/ejtPWCWie9ijDkfORYEL16c55I6HQkHXJTJxYZejF85n7YpPB.jpg"
            width="150"
          />
          <div className="event-details">
            <h2 className="event-title">Music Concert</h2>
            <p className="event-description">
              Join us for an evening of live music and entertainment.
            </p>
            <p className="event-date">Date: 25th December 2023</p>
            <div className="event-actions">
              <button className="join-btn">Join</button>
              <button
                className="cancel-btn cancel"
                style={{ display: 'none' }}
              >
                Cancel
              </button>
            </div>
          </div>
          <div className="admin-actions">
            <button className="edit-btn">Edit</button>
            <button className="delete-btn delete">Delete</button>
          </div>
        </div>
        <div className="event">
          <img
            alt="Image of a tech conference with speakers on stage and audience"
            height="150"
            src="https://storage.googleapis.com/a1aa/image/u2s6J2LxxsJjEZxT1rnwvrnybhDfotP7cC0lDCjDNu8bHL9JA.jpg"
            width="150"
          />
          <div className="event-details">
            <h2 className="event-title">Tech Conference</h2>
            <p className="event-description">
              Explore the latest in technology and innovation.
            </p>
            <p className="event-date">Date: 10th January 2024</p>
            <div className="event-actions">
              <button className="join-btn">Join</button>
              <button
                className="cancel-btn cancel"
                style={{ display: 'none' }}
              >
                Cancel
              </button>
            </div>
          </div>
          <div className="admin-actions">
            <button className="edit-btn">Edit</button>
            <button className="delete-btn delete">Delete</button>
          </div>
        </div>
        <div className="event">
          <img
            alt="Image of a charity run event with participants running"
            height="150"
            src="https://storage.googleapis.com/a1aa/image/VfPXTgTW3R02QaPVtjwcY5wOWati89qgIVXTBexf4wVwds0nA.jpg"
            width="150"
          />
          <div className="event-details">
            <h2 className="event-title">Charity Run</h2>
            <p className="event-description">
              Participate in our charity run to support a good cause.
            </p>
            <p className="event-date">Date: 5th February 2024</p>
            <div className="event-actions">
              <button className="join-btn">Join</button>
              <button
                className="cancel-btn cancel"
                style={{ display: 'none' }}
              >
                Cancel
              </button>
            </div>
          </div>
          <div className="admin-actions">
            <button className="edit-btn">Edit</button>
            <button className="delete-btn delete">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}
