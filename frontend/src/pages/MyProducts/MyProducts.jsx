import { useEffect, useState, useContext } from "react";
import { getMyProducts, deleteProduct } from "../../services/productService";
import ProductItem from "../../components/ProductItem/ProductItem";
import { AuthContext } from "../../context/AuthContext";

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
    <>
      <h2>My Products</h2>
      {products.map((p) => (
        <ProductItem key={p._id} product={p} onDelete={handleDelete} />
      ))}
    </>
  );
};

export default MyProducts;