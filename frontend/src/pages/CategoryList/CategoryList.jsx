import { useEffect, useState } from "react";
import {
  getCategories,
  addCategory,
  deleteCategory
} from "../../services/categoryService";
import "./CategoryList.css";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    getCategories().then((res) => setCategories(res.data));
  };

  const handleAdd = async () => {
    if (!name.trim()) return;
    await addCategory({ name });
    setName("");
    loadCategories();
  };

  const handleDelete = async (id) => {
    await deleteCategory(id);
    loadCategories();
  };

  return (
    <div className="category-container">
      <div className="category-card">
        <h2>Categories</h2>

        <div className="category-input-group">
          <input
            placeholder="Enter category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleAdd}>Add</button>
        </div>

        <div className="category-list">
          {categories.map((c) => (
            <div key={c._id} className="category-item">
              <span>{c.name}</span>
              <button
                className="delete-btn"
                onClick={() => handleDelete(c._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;