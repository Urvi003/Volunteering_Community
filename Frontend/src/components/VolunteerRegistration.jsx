import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const VolunteerRegistration = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    // Phone number validation: must be exactly 10 digits
    if (!/^\d{10}$/.test(phone)) {
      toast.error("Phone number must be exactly 10 digits.");
      return;
    }

    // Password validation
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("/api/v1/volunteer/register", {
        firstName,
        lastName,
        email,
        phone,
        country,
        password,
      });
      toast.success(response.data.message);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setCountry("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="volunteer-registration">
      <div className="container">
        <div className="form-container">
          <form onSubmit={handleRegister}>
            <h2>Volunteer Registration</h2>
            <div className="input-group">
              <input
                type="text"
                value={firstName}
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                value={lastName}
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <input
                type="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="tel"
                value={phone}
                placeholder="Phone (10 digits)"
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <input
                type="text"
                value={country}
                placeholder="Country"
                onChange={(e) => setCountry(e.target.value)}
                required
              />
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button className="btn" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default VolunteerRegistration;
