// import axios from "axios";
// import crypto from "crypto";
// import { Volunteer } from "../models/volunteer.js";

// export const checkout = async (req, res) => {
//   try {
//     const { amount } = req.body;
//     const invoice = await createInvoice(amount);
//     await Volunteer.create({
//       ...req.body,
//       orderId: invoice.result.order_id,
//       paymentStatus: invoice.result.status,
//     });
//     res.send(invoice);
//     console.log(amount);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };

// //Base URL
// const cryptomus = axios.create({ baseURL: "https://api.cryptomus.com/v1" });

// const createInvoice = async (amount) => {
//   try {
//     const data = {
//       amount: amount,
//       currency: "USD",
//       order_id: crypto.randomBytes(12).toString("hex"),
//       url_return: "https://volunteering-community.vercel.app/donate",
//       url_success: "https://volunteering-community.vercel.app",
//       lifetime: 300,
//     };

//     const sign = crypto
//       .createHash("md5")
//       .update(
//         Buffer.from(JSON.stringify(data)).toString("base64") +
//           process.env.PAYMENT_API_KEY
//       )
//       .digest("hex");

//     const headers = {
//       merchant: process.env.MERCHANT_ID,
//       sign,
//     };

//     const response = await cryptomus.post("/payment", data, { headers });

//     return response.data;
//   } catch (error) {
//     console.error("Error Occured:", error);
//     throw error;
//   }
// };

import Razorpay from "razorpay";

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: "rzp_test_U5LEndRPxKKGKg", // Your Razorpay key_id
  key_secret: "6ow1xlcT7zP4Fgi7SrXysR7v", // Your Razorpay key_secret
});

export const checkout = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // Razorpay expects amount in paise, so multiply by 100
      currency: "INR",
      receipt: `receipt_${Date.now()}`, // Unique receipt ID for the transaction
    };

    // Create order in Razorpay
    const order = await razorpay.orders.create(options);

    // Send back order ID to frontend
    res.status(200).json({
      success: true,
      order_id: order.id, // You’ll need this order ID on the frontend
      amount, // Send back the amount to the frontend
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong in order creation",
    });
  }
};
