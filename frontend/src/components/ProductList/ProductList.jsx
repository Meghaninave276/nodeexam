import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

// Make sure base_uri points to your backend API
export const base_uri = "http://localhost:5000/api";

export default function ProductList({ user, setUser }) {
  const [products, setProducts] = useState([]);  // default to empty array
  const [loading, setLoading] = useState(true);  // optional loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${base_uri}/products`, { withCredentials: true });
        
        setProducts(res.data.products || []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <h2>All Products</h2>
      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        <ul>
          {products.map((p) => (
            <li key={p._id}>
              {p.name} - {p.category?.name || "No Category"} - {p.user?.username || "Unknown User"} - ${p.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}