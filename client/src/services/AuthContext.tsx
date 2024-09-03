import { createContext, useEffect, useState } from "react";
import { fetchData } from "./helpers";

export const UserContext = createContext(null);

export default function AuthContext({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [user, setUser] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    countriesVisited: "",
  });

  const getUserData = async () => {
    try {
      const backendURL = import.meta.env.VITE_BACKEND_URL;

      const res = await fetchData(`${backendURL}/api/auth/getUser`, "GET");
      const data = await res.json();

      const { userId, firstName, lastName, email, countriesVisited } =
        data.payload;

      setUser({ userId, firstName, lastName, email, countriesVisited });
      setIsLoading(false);
      setIsAuthenticated(true);
    } catch (err) {
      console.log("Error fetching user data:", err);
    }
  };

  useEffect(() => {
    getUserData();
  }, [isAuthenticated]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <UserContext.Provider value={[user, setUser]}>
          {children}
        </UserContext.Provider>
      )}
    </>
  );
}
