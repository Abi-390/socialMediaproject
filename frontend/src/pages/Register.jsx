import { useState } from "react";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register({ username, password });
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 via-neutral-900 to-zinc-800">
  <form
    onSubmit={handleSubmit}
    className="w-80 p-6 rounded-xl shadow-2xl
      bg-zinc-900/90 backdrop-blur-md space-y-4"
  >
    {/* Brand */}
    <h2
      className="
        text-2xl font-extrabold text-center
        bg-gradient-to-r from-rose-400 via-orange-400 to-amber-300
        bg-clip-text text-transparent
      "
    >
      Captionary
    </h2>

    <p className="text-center text-sm text-zinc-400">
      Create your account
    </p>

    {/* Username */}
    <input
      type="text"
      placeholder="Username"
      className="
        w-full rounded-lg bg-zinc-800 text-zinc-100
        placeholder-zinc-400 px-3 py-2
        border border-zinc-700
        focus:outline-none focus:ring-2
        focus:ring-orange-400
      "
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />

    {/* Password */}
    <input
      type="password"
      placeholder="Password"
      className="
        w-full rounded-lg bg-zinc-800 text-zinc-100
        placeholder-zinc-400 px-3 py-2
        border border-zinc-700
        focus:outline-none focus:ring-2
        focus:ring-orange-400
      "
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    {/* Submit */}
    <button
      type="submit"
      className="
        w-full py-2 rounded-lg font-semibold text-white
        bg-gradient-to-r from-rose-500 to-orange-400
        hover:opacity-90 transition-all duration-300
      "
    >
      Register
    </button>

    {/* Login link */}
    <p className="text-center text-sm text-zinc-400">
      Already have an account?{" "}
      <Link
        to="/login"
        className="
          font-semibold
          bg-gradient-to-r from-rose-400 to-orange-300
          bg-clip-text text-transparent hover:underline
        "
      >
        Login
      </Link>
    </p>
  </form>
</div>

  );
}
