import React, { useState } from 'react';
import '../css/userdash.css';

const EventList = ({ initialEvents = [] }) => {
    const [events, setEvents] = useState(initialEvents);
    const [visibleCount, setVisibleCount] = useState(5); 
    const [interestedEvents, setInterestedEvents] = useState(new Set());

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
        setVisibleCount(visibleCount + 6); 
    };

    return (
        <div className="event-list">
            <div className="event-list-header">
                <h2>Available Events</h2>
            </div>
            <ul>
                {events.slice(0, visibleCount).map(event => (
                    <li key={event.id}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={event.imageUrl} alt={event.name} style={{ width: '50px', height: '50px', borderRadius: '4px', marginRight: '10px' }} />
                            <span>{event.name}</span>
                        </div>
                        <div>
                            <button onClick={() => handleToggleInterest(event.id)}>
                                {interestedEvents.has(event.id) ? 'Uninterested' : 'Interested'}
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
