import { createBrowserRouter } from "react-router-dom";
import { WelcomePage } from "../pages/WelcomePage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import ExplorePage from "../pages/ExplorePage";
import MessagesPage from "../pages/MessagesPage";
import ProfilePage from "../pages/ProfilePage";
import SettingsPage from "../pages/SettingsPage";
import ProtectedRoute from "../services/ProtectedRoute";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <WelcomePage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/home",
      element: (
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/explore",
      element: (
        <ProtectedRoute>
          <ExplorePage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/messages",
      element: (
        <ProtectedRoute>
          <MessagesPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/profile",
      element: (
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/settings",
      element: (
        <ProtectedRoute>
          <SettingsPage />
        </ProtectedRoute>
      ),
    },
  ]);

  return router;
};

export default Router;
