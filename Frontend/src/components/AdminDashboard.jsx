import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [events, setEvents] = useState([]);
  const [editVolunteer, setEditVolunteer] = useState(null);
  const [editEvent, setEditEvent] = useState(null);
  const [viewVolunteerId, setViewVolunteerId] = useState(null); // For viewing volunteer details
  const [viewEventId, setViewEventId] = useState(null); // For viewing event details

  const [volunteerForm, setVolunteerForm] = useState({ firstName: "", lastName: "", email: "", country: "", phone: "" });
  const [eventForm, setEventForm] = useState({ organizationName: "", phone: "", email: "", eventDestination: "", eventName: "", volunteersNeeded: "" });

  useEffect(() => {
    fetchVolunteers();
    fetchEvents();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const response = await axios.get("/api/v1/volunteer");
      setVolunteers(response.data);
    } catch (error) {
      console.error("Error fetching volunteers:", error);
      toast.error("Failed to fetch volunteers.");
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get("/api/v1/event");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to fetch events.");
    }
  };

  const deleteVolunteer = async (id) => {
    try {
      await axios.delete(`/api/v1/volunteer/${id}`);
      toast.success("Volunteer deleted successfully!");
      fetchVolunteers();
    } catch (error) {
      toast.error("Failed to delete volunteer.");
    }
  };


  const deleteEvent = async (id) => {
    try {
      await axios.delete(`/api/v1/event/${id}`);
      toast.success("Event deleted successfully!");
      fetchEvents();
    } catch (error) {
      toast.error("Failed to delete event.");
    }
  };

  const handleEditVolunteer = (volunteer) => {
    setEditVolunteer(volunteer);
    setVolunteerForm({
      firstName: volunteer.firstName,
      lastName: volunteer.lastName,
      email: volunteer.email,
      country: volunteer.country,
      phone: volunteer.phone,
    });
  };

  const handleEditEvent = (event) => {
    setEditEvent(event);
    setEventForm({
      organizationName: event.organizationName,
      phone: event.phone,
      email: event.email,
      eventDestination: event.eventDestination,
      eventName: event.eventName,
      volunteersNeeded: event.volunteersNeeded,
    });
  };

  const updateVolunteer = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/v1/volunteer/${editVolunteer._id}`, volunteerForm);
      toast.success("Volunteer updated successfully!");
      fetchVolunteers();
      setEditVolunteer(null);
      setVolunteerForm({ firstName: "", lastName: "", email: "", country: "", phone: "" });
    } catch (error) {
      toast.error("Failed to update volunteer.");
    }
  };

  const updateEvent = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/v1/event/${editEvent._id}`, eventForm);
      toast.success("Event updated successfully!");
      fetchEvents();
      setEditEvent(null);
      setEventForm({ organizationName: "", phone: "", email: "", eventDestination: "", eventName: "", volunteersNeeded: "" });
    } catch (error) {
      toast.error("Failed to update event.");
    }
  };

  const handleViewVolunteer = (volunteerId) => {
    setViewVolunteerId(viewVolunteerId === volunteerId ? null : volunteerId); // Toggle view
  };

  const handleViewEvent = (eventId) => {
    setViewEventId(viewEventId === eventId ? null : eventId); // Toggle view
  };

  return (
    <section className="admin-dashboard">
      <div className="container">
        <h2>Registered Volunteers</h2>
        <ul>
          {volunteers.map((volunteer) => (
            <li key={volunteer._id}>
              <strong>{volunteer.firstName} {volunteer.lastName}</strong> <br />
              <button onClick={() => handleViewVolunteer(volunteer._id)}>
                {viewVolunteerId === volunteer._id ? "Hide Details" : "View Details"}
              </button>
              <button onClick={() => handleEditVolunteer(volunteer)}>Edit</button>
              <button onClick={() => deleteVolunteer(volunteer._id)}>Delete</button>

              {/* Conditionally render volunteer details */}
              {viewVolunteerId === volunteer._id && (
                <div className="volunteer-details">
                  <p><strong>Email:</strong> {volunteer.email}</p>
                  <p><strong>Country:</strong> {volunteer.country}</p>
                  <p><strong>Phone:</strong> {volunteer.phone}</p>
                </div>
              )}
            </li>
          ))}
        </ul>

        {editVolunteer && (
          <form onSubmit={updateVolunteer}>
            <input type="text" value={volunteerForm.firstName} placeholder="First Name" onChange={(e) => setVolunteerForm({ ...volunteerForm, firstName: e.target.value })} required />
            <input type="text" value={volunteerForm.lastName} placeholder="Last Name" onChange={(e) => setVolunteerForm({ ...volunteerForm, lastName: e.target.value })} required />
            <input type="email" value={volunteerForm.email} placeholder="Email" onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })} required />
            <input type="text" value={volunteerForm.country} placeholder="Country" onChange={(e) => setVolunteerForm({ ...volunteerForm, country: e.target.value })} required />
            <input type="text" value={volunteerForm.phone} placeholder="Phone" onChange={(e) => setVolunteerForm({ ...volunteerForm, phone: e.target.value })} required />
            <button type="submit">Update Volunteer</button>
          </form>
        )}

        <h2>Registered Events</h2>
        <ul>
          {events.map((event) => (
            <li key={event._id}>
              <strong>{event.eventName}</strong> <br />
              <button onClick={() => handleViewEvent(event._id)}>
                {viewEventId === event._id ? "Hide Details" : "View Details"}
              </button>
              <button onClick={() => handleEditEvent(event)}>Edit</button>
              <button onClick={() => deleteEvent(event._id)}>Delete</button>

              {/* Conditionally render event details */}
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

        {editEvent && (
          <form onSubmit={updateEvent}>
            <input type="text" value={eventForm.organizationName} placeholder="Organization Name" onChange={(e) => setEventForm({ ...eventForm, organizationName: e.target.value })} required />
            <input type="text" value={eventForm.phone} placeholder="Phone" onChange={(e) => setEventForm({ ...eventForm, phone: e.target.value })} required />
            <input type="email" value={eventForm.email} placeholder="Email" onChange={(e) => setEventForm({ ...eventForm, email: e.target.value })} required />
            <input type="text" value={eventForm.eventDestination} placeholder="Event Destination" onChange={(e) => setEventForm({ ...eventForm, eventDestination: e.target.value })} required />
            <input type="text" value={eventForm.eventName} placeholder="Event Name" onChange={(e) => setEventForm({ ...eventForm, eventName: e.target.value })} required />
            <input type="number" value={eventForm.volunteersNeeded} placeholder="Volunteers Needed" onChange={(e) => setEventForm({ ...eventForm, volunteersNeeded: e.target.value })} required />
            <button type="submit">Update Event</button>
          </form>
        )}
      </div>
    </section>
  );
};

export default AdminDashboard;
