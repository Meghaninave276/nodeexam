import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateProduct, getMyProducts } from "../../services/productService";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: ""
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getMyProducts();
        const product = res.data.find((p) => p._id === id);

        if (product) {
          setForm({
            name: product.name || "",
            price: product.price || "",
            description: product.description || "",
            category: product.category?._id || ""
          });
        }
      } catch (error) {
        console.log(error.response?.data?.message);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(id, form);
      navigate("/my-products");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Product</h2>

      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        placeholder="Price"
        value={form.price}
        onChange={(e) =>
          setForm({ ...form, price: e.target.value })
        }
      />

      <input
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <input
        placeholder="Category ID"
        value={form.category}
        onChange={(e) =>
          setForm({ ...form, category: e.target.value })
        }
      />

      <button type="submit">Update</button>
    </form>
  );
};

export default EditProduct;