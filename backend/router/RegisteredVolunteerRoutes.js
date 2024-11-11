import express from "express";
import bcrypt from "bcrypt"; // For password hashing and comparison
import { RegisteredVolunteers } from "../models/RegisteredVolunteer.js"; // Updated path
import { EventRegistration } from "../models/EventRegistration.js";


const router = express.Router();

// Route for registering a volunteer
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, country, phone, password } = req.body;

    // Validate phone number length
    if (phone.length !== 10) {
      return res.status(400).json({ message: "Phone number must be 10 digits" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new volunteer
    const newVolunteer = new RegisteredVolunteers({
      firstName,
      lastName,
      email,
      country,
      phone,
      password: hashedPassword, // Save the hashed password
    });

    // Save to the database
    await newVolunteer.save();
    res.status(201).json({ message: "Volunteer registered successfully!" });
  } catch (error) {
    console.error("Error registering volunteer:", error);
    res.status(500).json({ message: "An error occurred while registering volunteer." });
  }
});

// Route for fetching all volunteers
router.get("/", async (req, res) => {
  try {
    const volunteers = await RegisteredVolunteers.find(); // Fetch all volunteers from the database
    res.status(200).json(volunteers); // Send the list of volunteers as response
  } catch (error) {
    console.error("Error fetching volunteers:", error);
    res.status(500).json({ message: "Failed to fetch volunteers." });
  }
});

// // Route for fetching events by volunteer ID
// router.get("/volunteer/:id/events", async (req, res) => {
//   const volunteerId = req.params.volunteerId;

//   try {
//     // Find events where the volunteer is listed in the volunteers array
//     const events = await Event.find({ volunteers: volunteerId });

//     // Check if any events were found
//     if (!events || events.length === 0) {
//       return res.status(404).json({ message: "No events found for this volunteer." });
//     }

//     // Return the list of events
//     res.status(200).json(events);
//   } catch (error) {
//     console.error("Error fetching events:", error);
//     res.status(500).json({ message: "Failed to fetch events." });
//   }
// });

// // Route for fetching events by volunteer ID
// router.get("/volunteer/:id/events", async (req, res) => {
//   const volunteerId = req.params.id; // Fixed incorrect variable

//   try {
//     // Find events where the volunteer is listed in the volunteers array
//     const events = await Event.find({ volunteers: volunteerId });

//     // Ensure volunteers is defined as an array
//     if (!Array.isArray(events)) {
//       return res.status(404).json({ message: "No events found for this volunteer." });
//     }

//     // Return the list of events
//     res.status(200).json(events);
//   } catch (error) {
//     console.error("Error fetching events:", error);
//     res.status(500).json({ message: "Failed to fetch events." });
//   }
// });

// // Route for fetching events by volunteer ID
// router.get("/volunteer/:id/events", async (req, res) => {
//   const volunteerId = req.params.volunteerId;

//   try {
//     // Find events where the volunteer is listed in the volunteers array
//     const events = await Event.find({ volunteers: volunteerId });

//     // Check if any events were found
//     if (!events || events.length === 0) {
//       return res.status(404).json({ message: "No events found for this volunteer." });
//     }

//     // Return the list of events
//     res.status(200).json(events);
//   } catch (error) {
//     console.error("Error fetching events:", error);
//     res.status(500).json({ message: "Failed to fetch events." });
//   }
// });

// Update a volunteer
router.put("/:id", async (req, res) => {
  try {
    const updatedVolunteer = await RegisteredVolunteers.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedVolunteer);
  } catch (error) {
    res.status(500).json({ message: "Error updating volunteer" });
  }
});

// Route for deleting a volunteer
router.delete("/:id", async (req, res) => {
  try {
    const deletedVolunteer = await RegisteredVolunteers.findByIdAndDelete(req.params.id);
    
    if (!deletedVolunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }
    
    res.status(200).json({ message: "Volunteer deleted successfully!" });
  } catch (error) {
    console.error("Error deleting volunteer:", error);
    res.status(500).json({ message: "Failed to delete volunteer." });
  }
});

// Volunteer login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body; // Changed to email

  try {
    // Find the volunteer by email
    const volunteer = await RegisteredVolunteers.findOne({ email }); // Updated to search by email

    // Check if the volunteer exists
    if (!volunteer) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password."
      });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, volunteer.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password."
      });
    }

    // If login is successful, return success message and volunteer ID
    return res.status(200).json({
      success: true,
      message: "Login successful!",
      volunteerId: volunteer._id // Include the ID in the response
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during login."
    });
  }
});

router.put("/:id/change-password", async (req, res) => {
  const volunteerId = req.params.id;
  const { currentPassword, newPassword } = req.body;

  // Input validation
  if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Current and new passwords are required." });
  }

  try {
      const volunteer = await RegisteredVolunteers.findById(volunteerId);
      if (!volunteer) {
          return res.status(404).json({ message: "Volunteer not found" });
      }

      // Check if the current password is correct
      const isPasswordValid = await bcrypt.compare(currentPassword, volunteer.password);
      if (!isPasswordValid) {
          return res.status(401).json({ message: "Current password is incorrect." });
      }

      // Hash the new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      // Update the volunteer's password
      volunteer.password = hashedNewPassword;
      await volunteer.save();

      res.status(200).json({ message: "Password changed successfully!" });
  } catch (error) {
      console.error("Error changing password:", error); // Log the full error
      res.status(500).json({ message: "Error updating volunteer", error: error.message }); // Send back the error message
  }
});


// Route to get volunteer details by ID
router.get("/volunteer/:id", async (req, res) => {
  const volunteerId = req.params.id;

  try {
    const volunteer = await RegisteredVolunteers.findById(volunteerId);

    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    res.status(200).json(volunteer); // Send the volunteer data as response
  } catch (error) {
    console.error("Error fetching volunteer details:", error);
    res.status(500).json({ message: "Failed to fetch volunteer details." });
  }
});

// // Route for getting registered events for a volunteer
// router.get("/volunteer/:volunteerId/events", async (req, res) => {
//   try {
//     const { volunteerId } = req.params;
//     // Find events that the volunteer has registered for
//     const registeredEvents = await EventRegistration.find({ volunteers: volunteerId });
//     res.status(200).json(registeredEvents);
//   } catch (error) {
//     console.error("Error fetching registered events:", error);
//     res.status(500).json({ message: "Failed to fetch registered events." });
//   }
// });

// Route for getting registered events for a volunteer
router.get("/volunteer/:id/events", async (req, res) => {
  const volunteerId = req.params.id; // Get the volunteer ID from the route parameters

  try {
    // Fetch event registrations where the volunteer is listed
    const registrations = await EventRegistration.find({ volunteers: volunteerId });

    if (!registrations || registrations.length === 0) {
      return res.status(404).json({ message: "No registered events found." });
    }

    res.status(200).json(registrations); // Send the event registrations back to the client
  } catch (error) {
    console.error("Error fetching registered events:", error);
    res.status(500).json({ message: "Failed to fetch registered events." });
  }
});






export default router;

