import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";

// Base API URL
const base_uri = "http://localhost:5000/api";

export default function ProductForm({ user, setUser }) {
  const [categories, setCategories] = useState([]); // safe default
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${base_uri}/categories`, { withCredentials: true });
        setCategories(res.data.categories || []); // safe fallback
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCategories([]);
      }
    };

    // Fetch product if editing
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const res = await axios.get(`${base_uri}/products/${id}`, { withCredentials: true });
        setForm(res.data.product || {});
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchCategories();
    fetchProduct();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`${base_uri}/products/edit/${id}`, form, { withCredentials: true });
      } else {
        await axios.post(`${base_uri}/products/add`, form, { withCredentials: true });
      }
      navigate("/products/my");
    } catch (err) {
      console.error("Error submitting product:", err);
      alert(err.response?.data?.message || "Failed to submit product");
    }
  };

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <h2>{id ? "Edit Product" : "Add Product"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name || ""}
          onChange={handleChange}
          require