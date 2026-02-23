import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/productService";
import ProductItem from "../../components/ProductItem/ProductItem";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts().then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="productlist-container">
      <h2 className="productlist-title">All Products</h2>

      <div className="product-grid">
        {products.map((p) => (
          <ProductItem key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;