import mongoose from "mongoose";

// Define the schema for Event Registration
const eventRegistrationSchema = new mongoose.Schema({
  organizationName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v); // Validates a 10-digit number
      },
      message: (props) => `${props.value} is not a valid 10-digit phone number!`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  eventDestination: {
    type: String,
    required: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  volunteersNeeded: {
    type: Number,
    required: true,
  },
});

// Create the model based on the schema
export const EventRegistration = mongoose.model(
  "EventRegistration",
  eventRegistrationSchema
);
