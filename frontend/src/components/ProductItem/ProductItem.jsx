import { Link } from "react-router-dom";

const ProductItem = ({ product, onDelete }) => {
  return (
    <div style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
      <h3>{product.name}</h3>
      <p>Price: ₹{product.price}</p>
      <p>{product.description}</p>
      <p>Category: {product.category?.name}</p>
      <p>Owner: {product.user?.username}</p>

      {onDelete && (
        <>
          <Link to={`/edit-product/${product._id}`}>
            <button>Edit</button>
          </Link>

          <button onClick={() => onDelete(product._id)}>
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default ProductItem;