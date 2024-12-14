import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase/config';
import '../css/userdash.css';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleCount, setVisibleCount] = useState(5); 
    const [interestedEvents, setInterestedEvents] = useState(new Set());

    useEffect(() => {
        const eventsRef = ref(db, 'events');

        const unsubscribe = onValue(eventsRef, (snapshot) => {
            setLoading(true);
            setError(null);
            try {
                if (snapshot.exists()) {
                    const eventsData = snapshot.val();
                    const eventsList = Object.entries(eventsData)
                        .map(([id, data]) => ({ id, ...data }))
                        .filter(event => event.isPublic === true);
                    
                    // Sort events by date in descending order
                    eventsList.sort((a, b) => new Date(b.date) - new Date(a.date));
                    setEvents(eventsList);
                } else {
                    setEvents([]);
                }
            } catch (error) {
                setError('Failed to fetch events. Please try again later.');
            } finally {
                setLoading(false);
            }
        });

        // Cleanup subscription
        return () => unsubscribe();
    }, []);

    const handleToggleInterest = (eventId) => {
        setInterestedEvents(prev => {
            const newSet = new Set(prev);
            if (newSet.has(eventId)) {
                newSet.delete(eventId); 
            } else {
                newSet.add(eventId); 
            }
            return newSet;
        });
    };

    const handleShowMore = () => {
        setVisibleCount(visibleCount + 5); 
    };

    return (
        <div className="event-list">
            <div className="event-list-header">
                <h2>Available Events</h2>
            </div>
            {loading && <div className="loading">Loading events...</div>}
            {error && <div className="error-message">{error}</div>}
            <ul>
                {events.slice(0, visibleCount).map(event => (
                    <li key={event.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <img 
                            src={event.imageUrl} 
                            alt={event.title} 
                            style={{ width: '50px', height: '50px', borderRadius: '4px', marginRight: '10px' }} 
                        />
                        <span style={{ flex: 1 }}>{event.title}</span>
                        <div>
                            <button 
                                onClick={() => handleToggleInterest(event.id)}
                                style={{
                                    backgroundColor: interestedEvents.has(event.id) ? '#ff4d4d' : '#0bf588', // Red if "Remove Interest", Green if "Interested"
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    padding: '10px 15px',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s'
                                }}
                            >
                                {interestedEvents.has(event.id) ? 'Remove Interest' : 'Interested'}
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {visibleCount < events.length && (
                <button className="show-more" onClick={handleShowMore}>Show More</button>
            )}
        </div>
    );
};

export default EventList;
