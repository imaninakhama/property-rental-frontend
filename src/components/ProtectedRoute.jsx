import { useEffect } from "react";
import { useAuth, useRouter } from "../context/AuthContext";

export function ProtectedRoute({ children, hostOnly = false }) {
  const { user } = useAuth();
  const { navigate } = useRouter();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (hostOnly && user?.role !== "host") {
      navigate("/dashboard");
    }
  }, [user, hostOnly, navigate]);

  if (!user) return null;
  if (hostOnly && user?.role !== "host") return null;
  return children;
}
