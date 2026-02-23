import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/productService";
import ProductItem from "../../components/ProductItem/ProductItem";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts().then((res) => setProducts(res.data));
  }, []);

  return (
    <>
      <h2>All Products</h2>
      {products.map((p) => (
        <ProductItem key={p._id} product={p} />
      ))}
    </>
  );
};

export default ProductList;