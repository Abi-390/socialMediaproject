import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = document.cookie.includes("token=");
  return isLoggedIn ? children : <Navigate to="/login" />;
}
