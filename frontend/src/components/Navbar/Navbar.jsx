import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove cookie on backend
    fetch("http://localhost:5000/api/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => {
      setUser(null);
      navigate("/login");
    });
  };

  return (
    <nav style={{ padding: "10px", background: "#eee", display: "flex", justifyContent: "space-between" }}>
      <div>
        <Link to="/">All Products</Link> |{" "}
        {user && <Link to="/products/my">My Products</Link>} |{" "}
        {user && <Link to="/products/add">Add Product</Link>} |{" "}
        {user && user.role === "admin" && <Link to="/categories">Categories</Link>}
      </div>
      <div>
        {user ? (
          <>
            <span>Hello, {user.username} ({user.role})</span>{" "}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}