import { useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login({ username, password });
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-80 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Login</h2>

        <input
          type="text"
          placeholder="Username"
          className="border p-2 w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-black text-white w-full py-2">
  Login
</button>

<p className="text-center text-sm text-gray-600">
  Don&apos;t have an account?{" "}
  <Link
    to="/register"
    className="text-black font-semibold hover:underline"
  >
    Register
  </Link>
</p>

      </form>
    </div>
  );
}
