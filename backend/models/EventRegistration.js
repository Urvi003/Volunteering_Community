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

// const EventSchema = new mongoose.Schema({
//   organizationName: String,
//   phone: String,
//   email: String,
//   eventDestination: String,
//   eventName: String,
//   volunteersNeeded: Number,
//   volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RegisteredVolunteers' }]
// });

const EventSchema = new mongoose.Schema({
  organizationName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
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
  volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RegisteredVolunteers' }],
});


// Create the model based on the schema
export const EventRegistration = mongoose.model(
  "EventRegistration",
  eventRegistrationSchema
);

export const Event = mongoose.model("Event", EventSchema);
