import { useEffect, useState, useContext } from "react";
import { getMyProducts, deleteProduct } from "../../services/productService";
import ProductItem from "../../components/ProductItem/ProductItem";
import { AuthContext } from "../../context/AuthContext";
import "./MyProduct.css";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      getMyProducts().then((res) => setProducts(res.data));
    }
  }, [user]);

  const handleDelete = async (id) => {
    await deleteProduct(id);
    setProducts(products.filter((p) => p._id !== id));
  };

  return (
    <div className="myproducts-container">
      <h2 className="myproducts-title">My Products</h2>

      <div className="myproducts-grid">
        {products.map((p) => (
          <ProductItem key={p._id} product={p} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default MyProducts;