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

export const getTotalDonations = async (_req, res) => {
  try {
    // Fetch all payments from Razorpay
    const payments = await razorpay.payments.all({
      // Optionally, you can limit the time period or number of items fetched
      // Example: limit: 100, or created: { gt: 1683349200000 } for a specific date range
    });

    if (payments.items.length === 0) {
      return res.status(200).json({
        success: true,
        totalAmount: 0, // No donations found
      });
    }

    // Calculate the total donation amount
    const totalAmount = payments.items.reduce((acc, payment) => {
      return acc + payment.amount / 100; // Convert from paise to rupees
    }, 0);

    return res.status(200).json({
      success: true,
      totalAmount,
    });
  } catch (error) {
    console.error("Error fetching Razorpay payments:", error); // Log the full error for debugging
    return res.status(500).json({
      success: false,
      message: "Failed to fetch total donations",
      error: error.message || error, // Provide more details on the error
    });
  }
};