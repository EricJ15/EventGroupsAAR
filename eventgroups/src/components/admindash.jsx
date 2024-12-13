import React from 'react'

export default function admindash() {
  return (
    <div>
        <div class="header">
   Admin Dashboard
  </div>
  <div class="container">
   <div class="admin-actions">
    <button id="add-event-btn">
     Add Event
    </button>
   </div>
   <div class="event">
    <img alt="Image of a music concert with a large crowd and stage lighting" height="150" src="https://storage.googleapis.com/a1aa/image/ejtPWCWie9ijDkfORYEL16c55I6HQkHXJTJxYZejF85n7YpPB.jpg" width="150"/>
    <div class="event-details">
     <h2 class="event-title">
      Music Concert
     </h2>
     <p class="event-description">
      Join us for an evening of live music and entertainment.
     </p>
     <p class="event-date">
      Date: 25th December 2023
     </p>
     <div class="event-actions">
      <button class="join-btn">
       Join
      </button>
      <button class="cancel-btn cancel" style="display: none;">
       Cancel
      </button>
     </div>
    </div>
    <div class="admin-actions">
     <button class="edit-btn">
      Edit
     </button>
     <button class="delete-btn delete">
      Delete
     </button>
    </div>
   </div>
   <div class="event">
    <img alt="Image of a tech conference with speakers on stage and audience" height="150" src="https://storage.googleapis.com/a1aa/image/u2s6J2LxxsJjEZxT1rnwvrnybhDfotP7cC0lDCjDNu8bHL9JA.jpg" width="150"/>
    <div class="event-details">
     <h2 class="event-title">
      Tech Conference
     </h2>
     <p class="event-description">
      Explore the latest in technology and innovation.
     </p>
     <p class="event-date">
      Date: 10th January 2024
     </p>
     <div class="event-actions">
      <button class="join-btn">
       Join
      </button>
      <button class="cancel-btn cancel" style="display: none;">
       Cancel
      </button>
     </div>
    </div>
    <div class="admin-actions">
     <button class="edit-btn">
      Edit
     </button>
     <button class="delete-btn delete">
      Delete
     </button>
    </div>
   </div>
   <div class="event">
    <img alt="Image of a charity run event with participants running" height="150" src="https://storage.googleapis.com/a1aa/image/VfPXTgTW3R02QaPVtjwcY5wOWati89qgIVXTBexf4wVwds0nA.jpg" width="150"/>
    <div class="event-details">
     <h2 class="event-title">
      Charity Run
     </h2>
     <p class="event-description">
      Participate in our charity run to support a good cause.
     </p>
     <p class="event-date">
      Date: 5th February 2024
     </p>
     <div class="event-actions">
      <button class="join-btn">
       Join
      </button>
      <button class="cancel-btn cancel" style="display: none;">
       Cancel
      </button>
     </div>
    </div>
    <div class="admin-actions">
     <button class="edit-btn">
      Edit
     </button>
     <button class="delete-btn delete">
      Delete
     </button>
    </div>
   </div>
  </div>




    </div>
  )
}
