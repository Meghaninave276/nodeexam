import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";

export default function MyProducts({ user, setUser }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/my", { withCredentials: true })
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/products/delete/${id}`, { withCredentials: true })
      .then(() => setProducts(products.filter((p) => p._id !== id)))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <h2>My Products</h2>
      <Link to="/products/add">Add New Product</Link>
      <ul>
        {products.map((p) => (
          <li key={p._id}>
            {p.name} - {p.category?.name} - ${p.price}{" "}
            <Link to={`/products/edit/${p._id}`}>Edit</Link>{" "}
            <button onClick={() => handleDelete(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}