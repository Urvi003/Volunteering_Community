import express from "express";
import { RegisteredVolunteers } from "../models/RegisteredVolunteer.js"; // Updated path

const router = express.Router();

// Route for registering a volunteer
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, country, phone } = req.body;

    // Validate phone number length
    if (phone.length !== 10) {
      return res.status(400).json({ message: "Phone number must be 10 digits" });
    }

    // Create new volunteer
    const newVolunteer = new RegisteredVolunteers({
      firstName,
      lastName,
      email,
      country,
      phone,
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

export default router;

