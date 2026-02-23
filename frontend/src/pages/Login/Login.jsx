import { useState, useContext } from "react";
import { loginUser } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(form);
      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      console.log(err.response?.data?.message);
      alert(err.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, [e.target.name]: e.target.value })
        }
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) =>
          setForm({ ...form, [e.target.name]: e.target.value })
        }
      />

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;