import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faUserPlus, faUser } from '@fortawesome/free-solid-svg-icons'; // Importing user icon
import { useNavigate } from "react-router-dom"; // For navigation

const VolunteerDashboard = () => {
  const [events, setEvents] = useState([]);
  const [viewEventId, setViewEventId] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const volunteerId = localStorage.getItem("volunteerId"); // Get volunteer ID from local storage
  const navigate = useNavigate(); // For navigation to Account page

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
      console.log(response.data);
      setRegisteredEvents(response.data);
    } catch (error) {
      toast.error("Failed to fetch registered events.");
    }
  };



  // Check if the volunteer is already registered for the event
  const isRegistered = (eventId) => {
    return registeredEvents.some(event => event._id === eventId);
  };

 

 // Function to register for an event
 const registerForEvent = async (eventId) => {

    // Check if already registered before making a request
  if (isRegistered(eventId)) {
    toast.error("You have already registered for this event.");
    return;
  }
  try{
    const response = await axios.post(`/api/v1/event/${eventId}/register`, { volunteerId });
    if (response.status === 200 || response.status === 201) {
      toast.success("Successfully registered for the event!");
      fetchRegisteredEvents(); // Update the registered events list
    } else {
      throw new Error("Registration failed");
    }
  }  catch (error) {
    console.error("Error during event registration:", error.response || error.message);
    if (error.response && error.response.data.message) {
        toast.error(error.response.data.message); // Show specific error message
    } else {
        toast.error("Failed to register for the event."); // Fallback error message
    }
  }
};



  // Navigate to Account Page
  const handleAccountClick = () => {
    navigate("/account");
  };

  return (
    <section className="volunteer-dashboard">
      <div div className="container-full-width">
        {/* Account Icon */}
        <div className="account-icon" onClick={handleAccountClick}>
          <FontAwesomeIcon icon={faUser} size="2x" />
        </div>
        </div>

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
                  className="icon-btn1"
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>
              </div>
              
              
            {/* Register button disabled if already registered */}
                 <button
                   onClick={() => registerForEvent(event._id)}
                   className="icon-btn"
                   disabled={isRegistered(event._id)}
                 >
                   <FontAwesomeIcon icon={faUserPlus} /> {isRegistered(event._id) ? "Registered" : "Register"}
                 </button>


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
    </section>
  );
};

export default VolunteerDashboard;


