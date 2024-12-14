import React, { useState, useEffect } from 'react';
import { ref, onValue, update } from 'firebase/database';
import { db } from '../firebase/config';
import '../css/modal.css';

const EventsDisplayModal = ({ isOpen, onClose, userEmail }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const DEFAULT_IMAGE = "https://th.bing.com/th/id/OIP.H1gHhKVbteqm1U5SrwpPgwAAAA?rs=1&pid=ImgDetMain";

  useEffect(() => {
    if (!isOpen) return;

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
              ...data,
              isUserInterested: Array.isArray(data.interestedUsers) && 
                data.interestedUsers.includes(userEmail)
            }))
            .filter(event => event.isPublic === true);
          
          eventsList.sort((a, b) => new Date(b.date) - new Date(a.date));
          setEvents(eventsList);
        } else {
          setEvents([]);
        }
      } catch (error) {
        console.error("Error fetching events: ", error);
        setError('Failed to fetch events. Please try again later.');
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [isOpen, userEmail]);

  const handleInterested = async (event) => {
    if (!userEmail) {
      alert('Please log in to mark your interest');
      return;
    }

    try {
      const eventRef = ref(db, `events/${event.id}`);
      const currentInterestedUsers = Array.isArray(event.interestedUsers) ? event.interestedUsers : [];
      let updatedInterestedUsers;
      let newInterestedCount = parseInt(event.interested) || 0;

      if (event.isUserInterested) {
        updatedInterestedUsers = currentInterestedUsers.filter(email => email !== userEmail);
        newInterestedCount = Math.max(0, newInterestedCount - 1);
      } else {
        updatedInterestedUsers = [...currentInterestedUsers, userEmail];
        newInterestedCount = newInterestedCount + 1;
      }

      await update(eventRef, {
        interestedUsers: updatedInterestedUsers || [],
        interested: newInterestedCount || 0
      });
    } catch (error) {
      console.error("Error updating interest: ", error);
      alert('Failed to update interest. Please try again.');
    }
  };

  const handleImageError = (e) => {
    e.target.src = DEFAULT_IMAGE;
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content events-list" onClick={e => e.stopPropagation()}>
        <h2>Public Events</h2>

        {loading && <div className="loading">Loading events...</div>}
        {error && <div className="error-message">{error}</div>}
        
        <div className="events-container">
          {!loading && !error && events.map((event) => (
            <div className="event" key={event.id}>
              <div className="image-container">
                <img
                  alt={`${event.title}`}
                  src={event.imageUrl || DEFAULT_IMAGE}
                  onError={handleImageError}
                />
              </div>
              <div className="event-details">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p className="date">Date: {event.date}</p>
                <p className="interested-count">
                  <span className="count-number">{event.interested || 0}</span> people interested
                </p>
                <button 
                  className={`interest-btn ${event.isUserInterested ? 'interested' : ''}`}
                  onClick={() => handleInterested(event)}
                >
                  <span className="btn-text">
                    {event.isUserInterested ? 'Not Interested' : 'Interested'}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsDisplayModal; 