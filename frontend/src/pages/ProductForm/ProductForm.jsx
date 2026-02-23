import { useState, useEffect } from "react";
import { addProduct } from "../../services/productService";
import { getCategories } from "../../services/categoryService";
import { useNavigate } from "react-router-dom";
import "./ProductForm.css";

const ProductForm = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: ""
  });

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories().then((res) => setCategories(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addProduct(form);
    navigate("/");
  };

  return (
    <div className="product-container">
      <form className="product-form" onSubmit={handleSubmit}>
        <h2>Add New Product</h2>

        <input
          placeholder="Product Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <input
          placeholder="Image URL"
          value={form.image}
          onChange={(e) =>
            setForm({ ...form, image: e.target.value })
          }
        />

        <select
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default ProductForm;