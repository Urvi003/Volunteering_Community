import express from "express";
import { EventRegistration } from "../models/EventRegistration.js"; // Model file

const router = express.Router();

// Route for registering an event
router.post("/register", async (req, res) => {
  try {
    const { organizationName, phone, email, eventDestination, eventName, volunteersNeeded } = req.body;

    // Validate phone number length
    if (phone.length !== 10) {
      return res.status(400).json({ message: "Phone number must be 10 digits" });
    }

    // Create new event registration
    const newEvent = new EventRegistration({
      organizationName,
      phone,
      email,
      eventDestination,
      eventName,
      volunteersNeeded,
    });

    // Save to the database
    await newEvent.save();
    res.status(201).json({ message: "Event registered successfully!" });
  } catch (error) {
    console.error("Error registering event:", error);
    res.status(500).json({ message: "An error occurred while registering the event." });
  }
});
// Route for fetching all events
router.get("/", async (req, res) => {
    try {
      const events = await EventRegistration.find(); // Fetch all events from the database
      res.status(200).json(events); // Send the list of events as response
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ message: "Failed to fetch events." });
    }
  });

// Update an event
router.put("/:id", async (req, res) => {
    try {
      const updatedEvent = await EventRegistration.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(updatedEvent);
    } catch (error) {
      res.status(500).json({ message: "Error updating event" });
    }
  });

  // Route for deleting an event
router.delete("/:id", async (req, res) => {
    try {
      const deletedEvent = await EventRegistration.findByIdAndDelete(req.params.id);
      
      if (!deletedEvent) {
        return res.status(404).json({ message: "Event not found" });
      }
  
      res.status(200).json({ message: "Event deleted successfully!" });
    } catch (error) {
      console.error("Error deleting event:", error);
      res.status(500).json({ message: "Failed to delete event." });
    }
  });

export default router;
