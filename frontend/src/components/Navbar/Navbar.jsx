import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { logoutUser } from "../../services/authService";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <nav style={{ padding: "10px", background: "#222", color: "#fff" }}>
      <Link to="/">Products</Link> |{" "}
      {user && <Link to="/my-products">My Products</Link>} |{" "}
      {user && <Link to="/add-product">Add Product</Link>} |{" "}
      {user && <Link to="/categories">Categories</Link>} |{" "}
      {!user ? (
        <>
          <Link to="/login">Login</Link> |{" "}
          <Link to="/register">Register</Link>
        </>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </nav>
  );
};

export default Navbar;