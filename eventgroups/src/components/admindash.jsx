import React, { useState, useEffect } from 'react';
import { ref, onValue, remove } from 'firebase/database';
import { db } from '../firebase/config';
import CheckEvent from './CheckEvent';
import AdminEdit from './adminEdit';
import '../css/admindash.css';

export default function AdminDash() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEventForEdit, setSelectedEventForEdit] = useState(null);

  const DEFAULT_IMAGE = "https://th.bing.com/th/id/OIP.H1gHhKVbteqm1U5SrwpPgwAAAA?rs=1&pid=ImgDetMain";

  useEffect(() => {
    setLoading(true);
    setError(null);

    const eventsRef = ref(db, 'events');
    
    const unsubscribe = onValue(eventsRef, (snapshot) => {
      try {
        if (snapshot.exists()) {
          const eventsData = snapshot.val();
          const eventsList = Object.entries(eventsData)
            .map(([id, data]) => ({
              id,
              ...data
            }))
            .filter(event => event.isPublic === true);
          
          // Sort events by date in descending order
          eventsList.sort((a, b) => new Date(b.date) - new Date(a.date));
          setEvents(eventsList);
        } else {
          console.log('No events found');
          setEvents([]);
        }
      } catch (error) {
        console.error("Error fetching events: ", error);
        setError('Failed to fetch events. Please try again later.');
      } finally {
        setLoading(false);
      }
    }, (error) => {
      console.error("Database error: ", error);
      setError('Failed to connect to database. Please try again later.');
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const handleCheckEvent = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleEditEvent = (event) => {
    setSelectedEventForEdit(event);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedEventForEdit(null);
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const eventRef = ref(db, `events/${eventId}`);
        await remove(eventRef);
        // The onValue listener will automatically update the UI
      } catch (error) {
        console.error("Error deleting event: ", error);
        alert('Failed to delete event. Please try again.');
      }
    }
  };

  const handleImageError = (e) => {
    e.target.src = DEFAULT_IMAGE;
  };

  return (
    <div>
      <div className="header">
        <div className="title">Events Admin Dashboard</div>
      </div>

      <div className="container">
        {loading && <div className="loading">Loading events...</div>}
        {error && <div className="error-message">{error}</div>}
        {!loading && !error && events.length === 0 && (
          <div>No events found. Create your first event!</div>
        )}
        {!loading && !error && events.map((event) => (
          <div className="event" key={event.id}>
            <img
              alt={`Image for ${event.title}`}
              height="150"
              src={event.imageUrl || DEFAULT_IMAGE}
              width="150"
              onError={handleImageError}
            />
            <div className="event-details">
              <h2 className="event-title">{event.title}</h2>
              <p className="event-description">{event.description}</p>
              <p className="event-date">Date: {event.date}</p>

              <div className="event-actions">
                <button className="Check" onClick={() => handleCheckEvent(event)}>
                  Check Event
                </button>
              </div>
            </div>

            <div className="admin-actions">
              <button 
                className="edit-btn"
                onClick={() => handleEditEvent(event)}
              >
                Edit
              </button>
              <button 
                className="delete-btn delete"
                onClick={() => handleDeleteEvent(event.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <CheckEvent
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          eventDetails={selectedEvent}
        />
      )}

      {selectedEventForEdit && (
        <AdminEdit
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          event={selectedEventForEdit}
        />
      )}
    </div>
  );
}
