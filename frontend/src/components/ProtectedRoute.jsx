import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMe } from "../api/auth";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    getMe()
      .then(() => setAuthenticated(true))
      .catch(() => setAuthenticated(false))
      .finally(() => setLoading(false));
  }, []);

 
  if (loading) {
    return (
      <p className="text-center text-zinc-400 mt-10">
        Checking authentication…
      </p>
    );
  }

 
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

 
  return children;
}
