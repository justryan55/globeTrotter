import { jwtDecode } from "jwt-decode";
import { ReactNode, useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import AuthContext from "./AuthContext";

type ProtectedRouteProps = {
  children: ReactNode;
};
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = window.localStorage.getItem("token");
  const navigate = useNavigate();

  const isTokenExpired = (token: string) => {
    if (!token) {
      return true;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp !== undefined) {
        return decodedToken.exp < currentTime;
      }

      return true;
    } catch (err) {
      console.log("Error decoding token:", err);
      return true;
    }
  };

  useEffect(() => {
    if (token) {
      if (isTokenExpired(token)) {
        window.localStorage.removeItem("token");
        navigate("/");
      }
    }
  }, [token, navigate]);

  return (
    <div>
      {token ? <AuthContext>{children}</AuthContext> : <Navigate to="/" />}
    </div>
  );
}
