import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

export default function CategoryList({ user, setUser }) {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  const fetchCategories = () => {
    axios.get("http://localhost:5000/api/categories").then((res) => setCategories(res.data.create));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = () => {
    axios.post("http://localhost:5000/api/categories/add", { name }, { withCredentials: true })
      .then(() => {
        setName("");
        fetchCategories();
      });
  };

  const handleDelete = (id) => {
    axios.get(`http://localhost:2776/api/categories/delete/${id}`, { withCredentials: true })
      .then(() => fetchCategories());
  };

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <h2>Categories</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Category name" />
      <button onClick={handleAdd}>Add Category</button>
      <ul>
        {categories.map((c) => (
          <li key={c._id}>
            {c.name} <button onClick={() => handleDelete(c._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}