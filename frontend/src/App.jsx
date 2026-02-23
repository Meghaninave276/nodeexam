import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList/ProductList";
import MyProducts from "./components/MyProducts/MyProducts";
import ProductForm from "./components/ProductForm/ProductForm";
import CategoryList from "./components/CategoryList/CategoryList";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import axios from "axios";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:2776/api/me", { withCredentials: true })
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList user={user} setUser={setUser} />} />
        <Route path="/products/my" element={<MyProducts user={user} setUser={setUser} />} />
        <Route path="/products/add" element={<ProductForm user={user} setUser={setUser} />} />
        <Route path="/products/edit/:id" element={<ProductForm user={user} setUser={setUser} />} />
        <Route path="/categories" element={<CategoryList user={user} setUser={setUser} />} />
        <Route path="/login" element={<Signin setUser={setUser} />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}