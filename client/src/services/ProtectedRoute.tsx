import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router";

export default function ProtectedRoute({ children }) {
  const token = window.localStorage.getItem("token");
  const navigate = useNavigate();
  console.log(token);
  const isTokenExpired = (token) => {
    if (!token) {
      return true;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
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

  return <div>{token ? <div>{children}</div> : <Navigate to="/" />}</div>;
}
