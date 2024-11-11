import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const AccountPage = () => {
  const [volunteerDetails, setVolunteerDetails] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const volunteerId = localStorage.getItem("volunteerId"); // Get volunteer ID from local storage
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  
  useEffect(() => {
    // Fetch volunteer details on page load
    // const fetchVolunteerDetails = async () => {
    //   try {
    //     const response = await axios.get(`/api/v1/volunteer/${volunteerId}`);
    //     console.log(response.data); 
    //     setVolunteerDetails(response.data);
    //   } catch (error) {
    //     toast.error("Failed to fetch volunteer details.");
    //   }
    // };
    const fetchVolunteerDetails = async () => {
      try {
        const response = await axios.get(`/api/v1/volunteer/${volunteerId}`);
        const volunteers = response.data;
        
        // Find the volunteer with the matching ID
        const volunteer = volunteers.find(vol => vol._id === volunteerId);
    
        if (volunteer) {
          setVolunteerDetails(volunteer);
        } else {
          toast.error("Volunteer not found.");
        }
      } catch (error) {
        toast.error("Failed to fetch volunteer details.");
      }
    };
    

    fetchVolunteerDetails();
  }, [volunteerId]);

  // Function to handle password change
  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    try {
      const response = await axios.put(`/api/v1/volunteer/${volunteerId}/change-password`, {
        currentPassword,
        newPassword
      });
      toast.success("Password changed successfully!");
    } catch (error) {
      toast.error("Failed to change password.");
    }
  };

    // Function to handle logout
    const handleLogout = () => {
      localStorage.removeItem("volunteerId"); // Clear volunteer ID from localStorage
      navigate("/VolunteerLogin"); // Redirect to login page
      toast.success("Logged out successfully!");
    };


  return (
    <div className="account-page">
      <h1>My Account</h1>

      {volunteerDetails ? (
        <div className="volunteer-details">
          <h2>Personal Information</h2>
          <p><strong>First Name:</strong> {volunteerDetails.firstName}</p>
          <p><strong>Last Name:</strong> {volunteerDetails.lastName}</p>
          <p><strong>Email:</strong> {volunteerDetails.email}</p>
          <p><strong>Country:</strong> {volunteerDetails.country}</p>
          <p><strong>Phone:</strong> {volunteerDetails.phone}</p>
          
        </div>
      ) : (
        <p>Loading volunteer details...</p>
      )}

      <div className="change-password">
        <h2>Change Password</h2>
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button onClick={handleChangePassword}>Change Password</button>
      </div>
      {/* Logout Button */}
      <div className="change-password">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default AccountPage;
