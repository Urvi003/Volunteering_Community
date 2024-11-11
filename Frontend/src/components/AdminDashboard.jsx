
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [totalDonations, setTotalDonations] = useState(0);
  const [events, setEvents] = useState([]);
  const [editVolunteer, setEditVolunteer] = useState(null);
  const [editEvent, setEditEvent] = useState(null);
  const [viewVolunteerId, setViewVolunteerId] = useState(null);
  const [viewEventId, setViewEventId] = useState(null);
  const [volunteerForm, setVolunteerForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    phone: ''
  });
  const [eventForm, setEventForm] = useState({
    eventName: '',
    organizationName: '',
    email: '',
    phone: '',
    eventDestination: '',
    volunteersNeeded: ''
  });

  useEffect(() => {
    fetchVolunteers();
    fetchEvents();
    fetchTotalDonations();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const response = await axios.get("/api/v1/volunteer");
      setVolunteers(response.data);
    } catch (error) {
      toast.error("Failed to fetch volunteers.");
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get("/api/v1/event");
      setEvents(response.data);
    } catch (error) {
      toast.error("Failed to fetch events.");
    }
  };
  //  // Fetch total donations from the backend
  //  const fetchTotalDonations = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:4000/api/v1/donations/total");
  //     withCredentials: true,
  //     console.log(response.data); 
  //     setTotalDonations(response.data.totalAmount);
  //   } catch (error) {
  //     toast.error("Failed to fetch total donations.");
  //   }
  // };

  const fetchTotalDonations = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/donations/total", {
        withCredentials: true
      });
      console.log(response.data); 
      setTotalDonations(response.data.totalAmount);
    } catch (error) {
      toast.error("Failed to fetch total donations.");
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
    setVolunteerForm(volunteer); // populate the form with selected volunteer's data
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


return (
    <section className="admin-dashboard">
      <div className="container-full-width">

        {/* Total Donations Section */}
        <h2><strong>Total Donations: ₹{totalDonations}</strong></h2>
        
        {/* Registered Volunteers Section */}
        <h2><strong>Registered Volunteers:</strong></h2>
        <ul>
          {volunteers.map((volunteer, index) => (
            <li key={volunteer._id} className="list-item">
              <div className="volunteer-info">
                <span>{index + 1}. <strong>{volunteer.firstName} {volunteer.lastName}</strong></span>
              </div>
              <div className="button-group">
                <button onClick={() => setViewVolunteerId(viewVolunteerId === volunteer._id ? null : volunteer._id)} className="icon-btn">
                  <FontAwesomeIcon icon={faEye} />
                </button>
                <button onClick={() => handleEditVolunteer(volunteer)} className="icon-btn">
                  <FontAwesomeIcon icon={faPencilAlt} />
                </button>
                <button onClick={() => deleteVolunteer(volunteer._id)} className="icon-btn">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
              
              {/* Show volunteer details when the eye button is clicked */}
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

        {/* Volunteer Edit Form */}
        {editVolunteer && (
          <form onSubmit={updateVolunteer} className="edit-form">
            <input type="text" value={volunteerForm.firstName} placeholder="First Name" 
              onChange={(e) => setVolunteerForm({ ...volunteerForm, firstName: e.target.value })} required />
            <input type="text" value={volunteerForm.lastName} placeholder="Last Name" 
              onChange={(e) => setVolunteerForm({ ...volunteerForm, lastName: e.target.value })} required />
            <input type="email" value={volunteerForm.email} placeholder="Email" 
              onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })} required />
            <input type="text" value={volunteerForm.country} placeholder="Country" 
              onChange={(e) => setVolunteerForm({ ...volunteerForm, country: e.target.value })} required />
            <input type="text" value={volunteerForm.phone} placeholder="Phone" 
              onChange={(e) => setVolunteerForm({ ...volunteerForm, phone: e.target.value })} required />
            <button type="submit" className="BUTTON">Update Volunteer</button>
          </form>
        )}

        {/* Registered Events Section */}
        <h2><strong>Registered Events:</strong></h2>
        <ul>
          {events.map((event, index) => (
            <li key={event._id} className="list-item">
              <div className="event-info">
                <span>{index + 1}. <strong>{event.eventName}</strong></span>
              </div>
              <div className="button-group">
                <button onClick={() => setViewEventId(viewEventId === event._id ? null : event._id)} className="icon-btn">
                  <FontAwesomeIcon icon={faEye} />
                </button>
                <button onClick={() => handleEditEvent(event)} className="icon-btn">
                  <FontAwesomeIcon icon={faPencilAlt} />
                </button>
                <button onClick={() => deleteEvent(event._id)} className="icon-btn">
                  <FontAwesomeIcon icon={faTrash} />
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

        {/* Event Edit Form */}
        {editEvent && (
          <form onSubmit={updateEvent} className="edit-form">
            <input type="text" value={eventForm.eventName} placeholder="Event Name" 
              onChange={(e) => setEventForm({ ...eventForm, eventName: e.target.value })} required />
            <input type="text" value={eventForm.organizationName} placeholder="Organization Name" 
              onChange={(e) => setEventForm({ ...eventForm, organizationName: e.target.value })} required />
            <input type="email" value={eventForm.email} placeholder="Email" 
              onChange={(e) => setEventForm({ ...eventForm, email: e.target.value })} required />
            <input type="text" value={eventForm.phone} placeholder="Phone" 
              onChange={(e) => setEventForm({ ...eventForm, phone: e.target.value })} required />
            <input type="text" value={eventForm.eventDestination} placeholder="Event Destination" 
              onChange={(e) => setEventForm({ ...eventForm, eventDestination: e.target.value })} required />
            <input type="number" value={eventForm.volunteersNeeded} placeholder="Volunteers Needed" 
              onChange={(e) => setEventForm({ ...eventForm, volunteersNeeded: e.target.value })} required />
            <button type="submit" className="BUTTON">Update Event</button>
          </form>
        )}
      </div>
    </section>
  );
};

export default AdminDashboard;