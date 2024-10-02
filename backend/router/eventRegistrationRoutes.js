import express from "express";
import { EventRegistration } from "../models/EventRegistration.js"; // Model file
import { RegisteredVolunteers } from "../models/RegisteredVolunteer.js";
import { Event } from "../models/EventRegistration.js";


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
// // Route for fetching all events
// router.get("/", async (req, res) => {
//     try {
//       const events = await EventRegistration.find(); // Fetch all events from the database
//       res.status(200).json(events); // Send the list of events as response
//     } catch (error) {
//       console.error("Error fetching events:", error);
//       res.status(500).json({ message: "Failed to fetch events." });
//     }
//   });

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

  // router.post("/:eventId/register", async (req, res) => {
  //   try {
  //     const { volunteerId } = req.body;
  //     const { eventId } = req.params;
  
  //     // Find the event by ID
  //     const event = await EventRegistration.findById(eventId);
  //     if (!event) {
  //       return res.status(404).json({ message: "Event not found" });
  //     }
  
  //     // Find the volunteer by ID
  //     const volunteer = await RegisteredVolunteers.findById(volunteerId);
  //     if (!volunteer) {
  //       return res.status(404).json({ message: "Volunteer not found" });
  //     }
  
  //     // Register the volunteer to the event
  //     if (!event.volunteers.includes(volunteerId)) {
  //       event.volunteers.push(volunteerId);
  //       await event.save();
  //     }
  
  //     res.status(200).json({ message: "Volunteer registered to event successfully!" });
  //   } catch (error) {
  //     console.error("Error registering volunteer for event:", error);
  //     res.status(500).json({ message: "An error occurred during volunteer registration for the event." });
  //   }
  // });
  // router.post("/:eventId/register", async (req, res) => {
  //   try {
  //     const { volunteerId } = req.body; // Get the volunteerId from the request body
  //     const { eventId } = req.params; // Get the eventId from the request parameters
  
  //     // Find the event by ID
  //     const event = await EventRegistration.findById(eventId);
  //     if (!event) {
  //       return res.status(404).json({ message: "Event not found" }); // Return 404 if event is not found
  //     }
  
  //     // Ensure event.volunteers is initialized
  //     if (!event.volunteers) {
  //       event.volunteers = []; // Initialize as an empty array if undefined
  //     }
  
  //     // Find the volunteer by ID
  //     const volunteer = await RegisteredVolunteers.findById(volunteerId);
  //     if (!volunteer) {
  //       return res.status(404).json({ message: "Volunteer not found" }); // Return 404 if volunteer is not found
  //     }
  
  //     // Register the volunteer to the event
  //     if (!event.volunteers.includes(volunteerId)) {
  //       event.volunteers.push(volunteerId); // Add the volunteer to the event's volunteer list
  //       await event.save(); // Save the updated event
  //     }
  
  //     res.status(200).json({ message: "Volunteer registered to event successfully!" }); // Success response
  //   } catch (error) {
  //     console.error("Error registering volunteer for event:", error); // Log any errors
  //     res.status(500).json({ message: "An error occurred during volunteer registration for the event." }); // Error response
  //   }
  // });
  
  router.post("/:eventId/register", async (req, res) => {
    try {
      const { volunteerId } = req.body; // Get the volunteerId from the request body
      const { eventId } = req.params; // Get the eventId from the request parameters
  
      // Find the event by ID
      const event = await EventRegistration.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: "Event not found" }); // Return 404 if event is not found
      }
  
      // Ensure event.volunteers is initialized
      if (!event.volunteers) {
        event.volunteers = []; // Initialize as an empty array if undefined
      }
  
      // Find the volunteer by ID
      const volunteer = await RegisteredVolunteers.findById(volunteerId);
      if (!volunteer) {
        return res.status(404).json({ message: "Volunteer not found" }); // Return 404 if volunteer is not found
      }
  
      // Check if the volunteer is already registered for the event
      if (event.volunteers.includes(volunteerId)) {
        return res.status(400).json({ message: "You are already registered for this event." }); // Response when already registered
      }
  
      // Register the volunteer to the event if not already registered
      event.volunteers.push(volunteerId); // Add the volunteer to the event's volunteer list
      await event.save(); // Save the updated event
  
      res.status(200).json({ message: "Volunteer registered to event successfully!" }); // Success response
    } catch (error) {
      console.error("Error registering volunteer for event:", error); // Log any errors
      res.status(500).json({ message: "An error occurred during volunteer registration for the event." }); // Error response
    }
  });
  
  // router.post("/:eventId/register", async (req, res) => {
  //   try {
  //     const { volunteerId } = req.body; // Get the volunteerId from request body
  //     const { eventId } = req.params;    // Get the eventId from request parameters
  
  //     // Step 1: Find the event by ID in the Event schema
  //     const event = await Event.findById(eventId);
  //     if (!event) {
  //       return res.status(404).json({ message: "Event not found" }); // If no event is found, return 404
  //     }
  
  //     // Step 2: Find the volunteer by ID in the RegisteredVolunteers collection
  //     const volunteer = await RegisteredVolunteers.findById(volunteerId);
  //     if (!volunteer) {
  //       return res.status(404).json({ message: "Volunteer not found" }); // If volunteer not found, return 404
  //     }
  
  //     // Step 3: Check if the volunteer is already registered for this event
  //     if (event.volunteers.includes(volunteerId)) {
  //       return res.status(400).json({ message: "You are already registered for this event." }); // If already registered, return error
  //     }
  
  //     // Step 4: Add the volunteer to the event's volunteers list
  //     event.volunteers.push(volunteerId);
  
  //     // Step 5: Save the updated event to the database
  //     await event.save();
  
  //     // Step 6: Return a success message
  //     res.status(200).json({ message: "Volunteer registered successfully for the event!" });
  
  //   } catch (error) {
  //     console.error("Error registering volunteer for event:", error); // Log the error
  //     res.status(500).json({ message: "An error occurred while registering the volunteer for the event." }); // Return server error
  //   }
  // });

export default router;
