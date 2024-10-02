// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import axios from "axios"; // Import axios to make API requests

// const VolunteerLogin = () => {
//   const [firstName, setFirstName] = useState(""); // For the first name as username
//   const [password, setPassword] = useState(""); // For the password
//   const navigate = useNavigate();

//   // Function to handle volunteer login
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       // API request to login the volunteer
//       const response = await axios.post("/volunteers/login", { firstName, password });

//       if (response.data.success) {
//         toast.success("Login successful!");
//         navigate("/VolunteerDashboard"); // Navigate to volunteer dashboard on success
//       } else {
//         toast.error("Invalid username or password.");
//       }
//     } catch (error) {
//       toast.error("An error occurred during login.");
//     }
//   };

//   return (
//     <section className="login">
//       <div className="container">
//         <div className="form-container">
//           <form onSubmit={handleLogin}>
//             <h2>Volunteer Login</h2>
//             <div className="input-group">
//               <input
//                 type="text"
//                 value={firstName}
//                 placeholder="First Name"
//                 onChange={(e) => setFirstName(e.target.value)}
//               />
//               <input
//                 type="password"
//                 value={password}
//                 placeholder="Password"
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <button className="btn" type="submit">
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default VolunteerLogin;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VolunteerLogin = () => {
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch("api/v1/volunteer/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ firstName, password }),
  //     });
  //     const data = await response.json();

  //     if (data.success) {
  //       toast.success(data.message);
  //       // Navigate to the dashboard or another page
  //       navigate("/VolunteerDashboard");
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     toast.error("An error occurred during login.");
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("api/v1/volunteer/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, password }),
      });
      const data = await response.json();
  
      if (data.success) {
        toast.success(data.message);
        localStorage.setItem("volunteerId", data.volunteerId); // Save volunteer ID to localStorage
        // Navigate to the dashboard or another page
        navigate("/VolunteerDashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login.");
    }
  };

  return (
    <section className="login">
      <div className="container">
        <div className="form-container">
          <form onSubmit={handleLogin}>
            <h2>Volunteer Login</h2>
            <div className="input-group">
              <input
                type="text"
                value={firstName}
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="btn" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default VolunteerLogin;

