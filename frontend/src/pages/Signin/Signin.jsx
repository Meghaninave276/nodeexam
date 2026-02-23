import React, { useState } from "react";
import axios from "axios";
import { base_uri } from "../../utils/global.js";
import { Link, useNavigate } from "react-router-dom";

export default function Signin({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handlesignin = async () => {
    try {
      const user = { username: email, password }; 
      const res = await axios.post(`${base_uri}/signin`, user, { withCredentials: true });

      alert(res.data.message);

      if (res.data.status === 200) {
        
        const token = res.data.token;
       
        setUser({ username: email }); 
        navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Signin failed");
    }
  };

  return (
    <div>
      <h1>Signin</h1>

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <Link to="/signup">Don't have an account? Signup</Link>
      </div>

      <button onClick={handlesignin}>Signin</button>
    </div>
  );
}