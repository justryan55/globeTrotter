import { createContext, useEffect, useState } from "react";
import { fetchData } from "./helpers";

export const UserContext = createContext(null);

export default function AuthContext({ children }) {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const backendURL = import.meta.env.VITE_BACKEND_URL;

        const res = await fetchData(`${backendURL}/api/auth/getUser`, "GET");
        const data = await res.json();

        const { name, email } = data.payload;

        setUser({ name, email });
      } catch (err) {
        console.log("Error fetching user data:", err);
      }
    };
    getUserData();
  }, []);

  return <UserContext.Provider value={[user]}>{children}</UserContext.Provider>;
}
