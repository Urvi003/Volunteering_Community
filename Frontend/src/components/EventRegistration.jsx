
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EventRegistration = () => {
  const [organizationName, setOrganizationName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [eventDestination, setEventDestination] = useState("");
  const [eventName, setEventName] = useState("");
  const [volunteersNeeded, setVolunteersNeeded] = useState("");

  const handleEventRegistration = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/api/v1/event/register",
        {
          organizationName,
          phone,
          email,
          eventDestination,
          eventName,
          volunteersNeeded,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      // Reset form fields after successful registration
      setOrganizationName("");
      setPhone("");
      setEmail("");
      setEventDestination("");
      setEventName("");
      setVolunteersNeeded("");
      toast.success(res.data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error registering event");
    }
  };

  return (
    <section className="event-registration">
      <div className="container">
        <div className="form-container">
          <form onSubmit={handleEventRegistration}>
            <h2>EVENT REGISTRATION</h2>
            <div className="input-group">
              <input
                type="text"
                value={organizationName}
                placeholder="Organization Name"
                onChange={(e) => setOrganizationName(e.target.value)}
                required
              />
              <input
                type="text"
                value={phone}
                placeholder="Phone Number"
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <input
                type="email"
                value={email}
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="text"
                value={eventDestination}
                placeholder="Event Destination"
                onChange={(e) => setEventDestination(e.target.value)}
                required
              />
              <input
                type="text"
                value={eventName}
                placeholder="Event Name"
                onChange={(e) => setEventName(e.target.value)}
                required
              />
              <input
                type="number"
                value={volunteersNeeded}
                placeholder="Volunteers Needed"
                onChange={(e) => setVolunteersNeeded(e.target.value)}
                required
              />
            </div>
            <button className="btn" type="submit">
              Register Event
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EventRegistration;

