import { useEffect, useState } from "react";
// import {
//   getCategories,
//   addCategory,
//   deleteCategory,
// } from "../services/categoryService";
import { getCategories,addCategory,deleteCategory } from "../../services/categoryService";

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
    await addCategory({ name });
    setName("");
    loadCategories();
  };

  const handleDelete = async (id) => {
    await deleteCategory(id);
    loadCategories();
  };

  return (
    <>
      <h2>Categories</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleAdd}>Add</button>

      {categories.map((c) => (
        <div key={c._id}>
          {c.name}
          <button onClick={() => handleDelete(c._id)}>Delete</button>
        </div>
      ))}
    </>
  );
};

export default CategoryList;