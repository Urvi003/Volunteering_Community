// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faUserPlus } from '@fortawesome/free-solid-svg-icons';

// const VolunteerDashboard = () => {
//   const [events, setEvents] = useState([]);
//   const [viewEventId, setViewEventId] = useState(null);
//   const [registeredEvents, setRegisteredEvents] = useState([]); // Store events the volunteer has already registered for
//   const volunteerId = "123"; // Assuming you have the logged-in volunteer's ID, replace with dynamic data.

//   useEffect(() => {
//     fetchEvents();
//     fetchRegisteredEvents();
//   }, []);

//   // Fetch all available events
//   const fetchEvents = async () => {
//     try {
//       const response = await axios.get("/api/v1/event");
//       setEvents(response.data);
//     } catch (error) {
//       toast.error("Failed to fetch events.");
//     }
//   };

//   // Fetch events that the volunteer has already registered for
//   const fetchRegisteredEvents = async () => {
//     try {
//       const response = await axios.get(`/api/v1/volunteer/${volunteerId}/events`);
//       setRegisteredEvents(response.data);
//     } catch (error) {
//       toast.error("Failed to fetch registered events.");
//     }
//   };

//   // Function to register for an event
// //   const registerForEvent = async (eventId) => {
// //     try {
// //       await axios.post(`/api/v1/event/${eventId}/register`, { volunteerId });
// //       toast.success("Successfully registered for the event!");
// //       fetchRegisteredEvents(); // Update the registered events list
// //     } catch (error) {
// //       toast.error("Failed to register for the event.");
// //     }
// //   };

// const registerForEvent = async (eventId) => {
//     try {
//       const response = await axios.post(`/api/v1/event/${eventId}/register`, { volunteerId });
//       if (response.status === 200 || response.status === 201) {
//         toast.success("Successfully registered for the event!");
//         fetchRegisteredEvents(); // Update the registered events list
//       } else {
//         throw new Error("Registration failed");
//       }
//     } catch (error) {
//       console.error("Error during event registration:", error.response || error.message);
//       toast.error("Failed to register for the event.");
//     }
//   };

//   // Check if the volunteer is already registered for the event
//   const isRegistered = (eventId) => {
//     return registeredEvents.some(event => event._id === eventId);
//   };

//   return (
//     <section className="volunteer-dashboard">
//       <div className="container-full-width">

//         {/* Available Events Section */}
//         <h2><strong>Available Events:</strong></h2>
//         <ul>
//           {events.map((event, index) => (
//             <li key={event._id} className="list-item">
//               <div className="event-info">
//                 <span>{index + 1}. <strong>{event.eventName}</strong></span>
//               </div>
//               <div className="button-group">
//                 <button
//                   onClick={() => setViewEventId(viewEventId === event._id ? null : event._id)}
//                   className="icon-btn"
//                 >
//                   <FontAwesomeIcon icon={faEye} />
//                 </button>

//                 {/* Register button disabled if already registered */}
//                 <button
//                   onClick={() => registerForEvent(event._id)}
//                   className="icon-btn"
//                   disabled={isRegistered(event._id)}
//                 >
//                   <FontAwesomeIcon icon={faUserPlus} /> {isRegistered(event._id) ? "Registered" : "Register"}
//                 </button>
//               </div>

//               {/* Show event details when the eye button is clicked */}
//               {viewEventId === event._id && (
//                 <div className="event-details">
//                   <p><strong>Organization Name:</strong> {event.organizationName}</p>
//                   <p><strong>Email:</strong> {event.email}</p>
//                   <p><strong>Phone:</strong> {event.phone}</p>
//                   <p><strong>Event Destination:</strong> {event.eventDestination}</p>
//                   <p><strong>Volunteers Needed:</strong> {event.volunteersNeeded}</p>
//                 </div>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </section>
//   );
// };

// export default VolunteerDashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const VolunteerDashboard = () => {
  const [events, setEvents] = useState([]);
  const [viewEventId, setViewEventId] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const volunteerId = localStorage.getItem("volunteerId"); // Get volunteer ID from local storage
  console.log("Volunteer ID:", volunteerId); 

  useEffect(() => {
    if (volunteerId) {
      fetchEvents();
      fetchRegisteredEvents();
    } else {
      toast.error("Volunteer ID not found. Please log in.");
    }
  }, [volunteerId]);

  // Fetch all available events
  const fetchEvents = async () => {
    try {
      const response = await axios.get("/api/v1/event");
      setEvents(response.data);
    } catch (error) {
      toast.error("Failed to fetch events.");
    }
  };

  // Fetch events that the volunteer has already registered for
  const fetchRegisteredEvents = async () => {
    try {
      const response = await axios.get(`/api/v1/volunteer/${volunteerId}/events`);
      setRegisteredEvents(response.data);
    } catch (error) {
      toast.error("Failed to fetch registered events.");
    }
  };

  // Function to register for an event
  const registerForEvent = async (eventId) => {
    try {

      // Check if already registered before making a request
    if (isRegistered(eventId)) {
      toast.error("You have already registered for this event.");
      return;
    }
      const response = await axios.post(`/api/v1/event/${eventId}/register`, { volunteerId });
      if (response.status === 200 || response.status === 201) {
        toast.success("Successfully registered for the event!");
        fetchRegisteredEvents(); // Update the registered events list
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      console.error("Error during event registration:", error.response || error.message);
      toast.error("Failed to register for the event.");
    }
  };

  // Check if the volunteer is already registered for the event
  const isRegistered = (eventId) => {
    return registeredEvents.some(event => event._id === eventId);
  };

  return (
    <section className="volunteer-dashboard">
      <div className="container-full-width">

        {/* Available Events Section */}
        <h2><strong>Available Events:</strong></h2>
        <ul>
          {events.map((event, index) => (
            <li key={event._id} className="list-item">
              <div className="event-info">
                <span>{index + 1}. <strong>{event.eventName}</strong></span>
              </div>
              <div className="button-group">
                <button
                  onClick={() => setViewEventId(viewEventId === event._id ? null : event._id)}
                  className="icon-btn"
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>

                {/* Register button disabled if already registered */}
                <button
                  onClick={() => registerForEvent(event._id)}
                  className="icon-btn"
                  disabled={isRegistered(event._id)}
                >
                  <FontAwesomeIcon icon={faUserPlus} /> {isRegistered(event._id) ? "Registered" : "Register"}
                </button>
              </div>

              {/* Show event details when the eye button is clicked */}
              {viewEventId === event._id && (
                <div className="event-details">
                  <p><strong>Organization Name:</strong> {event.organizationName}</p>
                  <p><strong>Email:</strong> {event.email}</p>
                  <p><strong>Phone:</strong> {event.phone}</p>
                  <p><strong>Event Destination:</strong> {event.eventDestination}</p>
                  <p><strong>Volunteers Needed:</strong> {event.volunteersNeeded}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default VolunteerDashboard;

