// import express from "express";
// import { RegisteredVolunteers } from "../models/RegisteredVolunteer.js"; // Updated path

// const router = express.Router();

// // Route for registering a volunteer
// router.post("/register", async (req, res) => {
//   try {
//     const { firstName, lastName, email, country, phone } = req.body;

//     // Validate phone number length
//     if (phone.length !== 10) {
//       return res.status(400).json({ message: "Phone number must be 10 digits" });
//     }

//     // Create new volunteer
//     const newVolunteer = new RegisteredVolunteers({
//       firstName,
//       lastName,
//       email,
//       country,
//       phone,
//     });

//     // Save to the database
//     await newVolunteer.save();
//     res.status(201).json({ message: "Volunteer registered successfully!" });
//   } catch (error) {
//     console.error("Error registering volunteer:", error);
//     res.status(500).json({ message: "An error occurred while registering volunteer." });
//   }
// });
// // Route for fetching all volunteers
// router.get("/", async (req, res) => {
//   try {
//     const volunteers = await RegisteredVolunteers.find(); // Fetch all volunteers from the database
//     res.status(200).json(volunteers); // Send the list of volunteers as response
//   } catch (error) {
//     console.error("Error fetching volunteers:", error);
//     res.status(500).json({ message: "Failed to fetch volunteers." });
//   }
// });

// // Update a volunteer
// router.put("/:id", async (req, res) => {
//   try {
//     const updatedVolunteer = await RegisteredVolunteers.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.status(200).json(updatedVolunteer);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating volunteer" });
//   }
// });

// // Route for deleting a volunteer
// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedVolunteer = await RegisteredVolunteers.findByIdAndDelete(req.params.id);
    
//     if (!deletedVolunteer) {
//       return res.status(404).json({ message: "Volunteer not found" });
//     }
    
//     res.status(200).json({ message: "Volunteer deleted successfully!" });
//   } catch (error) {
//     console.error("Error deleting volunteer:", error);
//     res.status(500).json({ message: "Failed to delete volunteer." });
//   }
// });

// export default router;

// import express from "express";
// import bcrypt from "bcrypt"; // For password hashing
// import { RegisteredVolunteers } from "../models/RegisteredVolunteer.js"; // Updated path

// const router = express.Router();

// // Route for registering a volunteer
// router.post("/register", async (req, res) => {
//   try {
//     const { firstName, lastName, email, country, phone, password } = req.body;

//     // Validate phone number length
//     if (phone.length !== 10) {
//       return res.status(400).json({ message: "Phone number must be 10 digits" });
//     }

//     // Hash the password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new volunteer
//     const newVolunteer = new RegisteredVolunteers({
//       firstName,
//       lastName,
//       email,
//       country,
//       phone,
//       password: hashedPassword, // Save the hashed password
//     });

//     // Save to the database
//     await newVolunteer.save();
//     res.status(201).json({ message: "Volunteer registered successfully!" });
//   } catch (error) {
//     console.error("Error registering volunteer:", error);
//     res.status(500).json({ message: "An error occurred while registering volunteer." });
//   }
// });

// // Route for fetching all volunteers
// router.get("/", async (req, res) => {
//   try {
//     const volunteers = await RegisteredVolunteers.find(); // Fetch all volunteers from the database
//     res.status(200).json(volunteers); // Send the list of volunteers as response
//   } catch (error) {
//     console.error("Error fetching volunteers:", error);
//     res.status(500).json({ message: "Failed to fetch volunteers." });
//   }
// });

// // Update a volunteer
// router.put("/:id", async (req, res) => {
//   try {
//     const updatedVolunteer = await RegisteredVolunteers.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.status(200).json(updatedVolunteer);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating volunteer" });
//   }
// });

// // Route for deleting a volunteer
// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedVolunteer = await RegisteredVolunteers.findByIdAndDelete(req.params.id);
    
//     if (!deletedVolunteer) {
//       return res.status(404).json({ message: "Volunteer not found" });
//     }
    
//     res.status(200).json({ message: "Volunteer deleted successfully!" });
//   } catch (error) {
//     console.error("Error deleting volunteer:", error);
//     res.status(500).json({ message: "Failed to delete volunteer." });
//   }
// });

// export default router;

import express from "express";
import bcrypt from "bcrypt"; // For password hashing and comparison
import { RegisteredVolunteers } from "../models/RegisteredVolunteer.js"; // Updated path
// import { Event } from "../models/EventRegistration.js";
// import { volunteerLoginHandler } from "../controllers/volunteerController.js";

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

// Route for fetching events by volunteer ID
router.get("/volunteer/:id/events", async (req, res) => {
  const volunteerId = req.params.volunteerId;

  try {
    // Find events where the volunteer is listed in the volunteers array
    const events = await Event.find({ volunteers: volunteerId });

    // Check if any events were found
    if (!events || events.length === 0) {
      return res.status(404).json({ message: "No events found for this volunteer." });
    }

    // Return the list of events
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Failed to fetch events." });
  }
});

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

// // Volunteer login route
router.post("/login", async (req, res) => {
  const { firstName, password } = req.body;

  try {
    // Find the volunteer by firstName
    const volunteer = await RegisteredVolunteers.findOne({ firstName });

    // Check if the volunteer exists
    if (!volunteer) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password."
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
//   const { firstName, password } = req.body;

//   try {
//     // Find the volunteer by their first name
//     const volunteer = await RegisteredVolunteers.findOne({ firstName });

//     if (!volunteer) {
//       return res.status(400).json({ success: false, message: "Invalid username or password." });
//     }

//     // Compare the password with the hashed password in the database
//     const isPasswordValid = await bcrypt.compare(password, volunteer.password);

//     if (!isPasswordValid) {
//       return res.status(400).json({ success: false, message: "Invalid username or password." });
//     }

//     // If successful, return success
//     res.status(200).json({ success: true, message: "Login successful!" });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ success: false, message: "An error occurred during login." });
//   }
// });

// // Volunteer login route
// router.post("/login", async (req, res) => {
//   const { firstName, password } = req.body;

//   try {
//     // Find the volunteer by their first name
//     const volunteer = await RegisteredVolunteers.findOne({ firstName });

//     if (!volunteer) {
//       // If volunteer is not found, return 401
//       return res.status(401).json({ success: false, message: "Invalid username or password." });
//     }

//     // Compare the password with the hashed password in the database
//     const isPasswordValid = await bcrypt.compare(password, volunteer.password);

//     if (!isPasswordValid) {
//       // If the password is incorrect, return 401
//       return res.status(401).json({ success: false, message: "Invalid username or password." });
//     }

//     // If successful, return success
//     res.status(200).json({ success: true, message: "Login successful!" });
//   } catch (error) {
//     console.error("Login error:", error);
//     // Handle unexpected errors
//     res.status(500).json({ success: false, message: "An error occurred during login." });
//   }
// });


export default router;

