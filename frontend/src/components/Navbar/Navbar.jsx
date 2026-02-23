import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { logoutUser } from "../../services/authService";
import "./Navbar.css";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <div className="left-section">
          <Link to="/" className="logo">MyStore</Link>
          <Link to="/" className="nav-item">Products</Link>
        </div>

        <div className="nav-links">
          {user && <Link to="/my-products" className="nav-item ms-4">My Products</Link>}
          {user && <Link to="/add-product" className="nav-item" >Add Product</Link>}
          {user && <Link to="/categories" className="nav-item">Categories</Link>}

          {!user ? (
            <>
              <Link to="/login" className="nav-item ms-4">Login</Link>
              <Link to="/register" className="nav-item">Register</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;