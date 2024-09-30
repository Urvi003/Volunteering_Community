
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginId === "Admin" && password === "123") {
      toast.success("Login successful!");
      navigate("/AdminDashboard");
    } else {
      toast.error("Invalid login ID or password.");
    }
  };

  return (
    <section className="login">
      <div className="container">
        <div className="form-container">
          <form onSubmit={handleLogin}>
            <h2>Admin Login</h2>
            <div className="input-group">
              <input
                type="text"
                value={loginId}
                placeholder="Login ID"
                onChange={(e) => setLoginId(e.target.value)}
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

export default AdminLogin;
