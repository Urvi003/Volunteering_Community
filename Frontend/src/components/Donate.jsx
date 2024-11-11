import React, { useState } from "react";
import axios from "axios";

const Donate = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setDisableBtn(true);

    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      setDisableBtn(false);
      return;
    }

    try {
      const { data } = await axios.post(
        "/api/v1/checkout",
        { name, email, message, amount },
        { headers: { "Content-Type": "application/json" } }
      );

      const options = {
        key: "rzp_test_U5LEndRPxKKGKg", // Your Razorpay Key ID
        amount: data.amount * 100, // Amount in paise
        currency: "INR",
        name: "Donation",
        description: "Thank you for your generous donation",
        image: "/logo.png", // Your logo or any image
        order_id: data.order_id, // The order_id returned from the backend
        handler: function (response) {
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
          setDisableBtn(false);
        },
        prefill: {
          name: name,
          email: email,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      setDisableBtn(false);

      // .then((res) => {
      //   console.log(res.data);
      //   window.location.href = res.data.result.url;

        // Reset form fields after successful payment
        setName("");
        setEmail("");
        setMessage("");
        setAmount("");
        setDisableBtn(false); // Re-enable the button after resetting

    } catch (error) {
      console.error(error);
      setDisableBtn(false);
    }
  };

  return (
    <section className="donate">
      <form onSubmit={handleCheckout}>
        <div>
          <img src="/logo.png" alt="logo" />
        </div>
        <div>
          <label>Show your love for Poors</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter Donation Amount (INR)"
          />
        </div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
        />
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="btn" disabled={disableBtn}>
          Donate {amount ? `₹${amount}` : "₹0"}
        </button>
      </form>
    </section>
  );
};

export default Donate;
