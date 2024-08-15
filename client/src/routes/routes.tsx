import { createBrowserRouter } from "react-router-dom";
import { WelcomePage } from "../pages/WelcomePage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import ExplorePage from "../pages/ExplorePage";
import MessagesPage from "../pages/MessagesPage";
import ProfilePage from "../pages/ProfilePage";
import SettingsPage from "../pages/SettingsPage";

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
      element: <HomePage />,
    },
    {
      path: "/explore",
      element: <ExplorePage />,
    },
    {
      path: "/messages",
      element: <MessagesPage />,
    },
    {
      path: "/profile",
      element: <ProfilePage />,
    },
    {
      path: "/settings",
      element: <SettingsPage />,
    },
  ]);

  return router;
};

export default Router;
