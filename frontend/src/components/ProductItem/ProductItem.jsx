import { Link } from "react-router-dom";
import "./ProductItem.css";

const ProductItem = ({ product, onDelete }) => {
  return (
    <div className="product-card">
      
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      )}

      <div className="product-content">
        <h3>{product.name}</h3>
        <p className="price">₹{product.price}</p>
        <p className="description">{product.description}</p>
        <p className="category">Category: {product.category?.name}</p>
        <p className="owner">Owner: {product.user?.username}</p>

        {onDelete && (
          <div className="product-buttons">
            <Link to={`/edit-product/${product._id}`}>
              <button className="edit-btn">Edit</button>
            </Link>

            <button
              className="delete-btn"
              onClick={() => onDelete(product._id)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductItem;