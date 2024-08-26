import { createContext, useEffect, useState } from "react";
import { fetchData } from "./helpers";

export const UserContext = createContext(null);

export default function AuthContext({ children }) {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countriesVisited: "",
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const backendURL = import.meta.env.VITE_BACKEND_URL;

        const res = await fetchData(`${backendURL}/api/auth/getUser`, "GET");
        const data = await res.json();
        const { firstName, lastName, email, countriesVisited } = data.payload;

        setUser({ firstName, lastName, email, countriesVisited });
      } catch (err) {
        console.log("Error fetching user data:", err);
      }
    };
    getUserData();
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
}
