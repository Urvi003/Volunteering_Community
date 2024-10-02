// import mongoose from "mongoose";

// // Define the schema for volunteer registration
// const registeredVolunteersSchema = new mongoose.Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true },
//   phone: {
//     type: String,
//     required: true,
//     validate: {
//       validator: function (v) {
//         return /^\d{10}$/.test(v); // Ensures exactly 10 digits for phone number
//       },
//       message: (props) => `${props.value} is not a valid 10-digit phone number!`,
//     },
//   },
//   country: { type: String, required: true },
// });

// // Create the model using the schema
// export const RegisteredVolunteers = mongoose.model("RegisteredVolunteers", registeredVolunteersSchema);

import mongoose from "mongoose";

// Define the schema for volunteer registration
const registeredVolunteersSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v); // Ensures exactly 10 digits for phone number
      },
      message: (props) => `${props.value} is not a valid 10-digit phone number!`,
    },
  },
  country: { type: String, required: true },
  password: { type: String, required: true }, // Added password field
});

// Create the model using the schema
export const RegisteredVolunteers = mongoose.model("RegisteredVolunteers", registeredVolunteersSchema);

