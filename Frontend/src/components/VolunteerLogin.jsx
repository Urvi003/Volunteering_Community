// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const VolunteerLogin = () => {
//   const [firstName, setFirstName] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("api/v1/volunteer/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ firstName, password }),
//       });
//       const data = await response.json();
  
//       if (data.success) {
//         toast.success(data.message);
//         localStorage.setItem("volunteerId", data.volunteerId); 
//         navigate("/VolunteerDashboard");
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error("Login error:", error);
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("api/v1/volunteer/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Changed to use email
      });
      const data = await response.json();
  
      if (data.success) {
        toast.success(data.message);
        localStorage.setItem("volunteerId", data.volunteerId); 
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
                type="email" // Changed to email input
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
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


