import { createContext, ReactNode, useEffect, useState } from "react";
import { fetchData } from "./helpers";

type User = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  countriesVisited: string[];
  friends: string[];
  followers: string[];
};

type AuthContextProps = {
  children: ReactNode;
};

export const UserContext = createContext<
  [User, React.Dispatch<React.SetStateAction<User>>] | null
>(null);

export default function AuthContext({ children }: AuthContextProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [user, setUser] = useState<User>({
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    countriesVisited: [],
    friends: [],
    followers: [],
  });

  const getUserData = async () => {
    try {
      const res = await fetchData(`auth/getUser`, "GET");
      const data = await res?.json();

      const {
        userId,
        firstName,
        lastName,
        email,
        countriesVisited,
        friends,
        followers,
      } = data.payload;

      setUser({
        userId,
        firstName,
        lastName,
        email,
        countriesVisited,
        friends,
        followers,
      });
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
