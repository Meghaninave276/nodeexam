import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ProductList from "./pages/ProductList/ProductList";
import MyProducts from "./pages/MyProducts/MyProducts";
import ProductForm from "./pages/ProductForm/ProductForm";
import CategoryList from "./pages/CategoryList/CategoryList";
import EditProduct from "./pages/EditProduct/EditProduct"; // ✅ IMPORT
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ My Products */}
        <Route
          path="/my-products"
          element={
            <PrivateRoute>
              <MyProducts />
            </PrivateRoute>
          }
        />

        {/* ✅ Add Product */}
        <Route
          path="/add-product"
          element={
            <PrivateRoute>
              <ProductForm />
            </PrivateRoute>
          }
        />

        {/* ✅ Categories */}
        <Route
          path="/categories"
          element={
            <PrivateRoute>
              <CategoryList />
            </PrivateRoute>
          }
        />

        {/* ✅ Edit Product (Protected) */}
        <Route
          path="/edit-product/:id"
          element={
            <PrivateRoute>
              <EditProduct />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;