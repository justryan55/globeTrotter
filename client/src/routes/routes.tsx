import { createBrowserRouter } from "react-router-dom";
import { WelcomePage } from "../pages/WelcomePage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import MessagingPage from "../pages/MessagingPage";
import ExplorePage from "../pages/ExplorePage";
import ConstructionPage from "../pages/ConstructionPage";
import ProfilePage from "../pages/ProfilePage";
import SettingsPage from "../pages/SettingsPage";
import ProtectedRoute from "../services/ProtectedRoute";
import ScratchMap from "../pages/ScratchMap";
import RestaurantFinder from "../pages/RestaurantPage";
import TravelBuddyPage from "../pages/TravelBuddyPage";
import ViewUserProfilePage from "../pages/ViewUserProfilePage";

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
          <MessagingPage />
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
      path: "/profile/:userId",
      element: (
        <ProtectedRoute>
          <ViewUserProfilePage />
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
    {
      path: "/explore/scratch-map",
      element: (
        <ProtectedRoute>
          <ScratchMap />
        </ProtectedRoute>
      ),
    },
    {
      path: "/explore/restaurant-finder",
      element: (
        <ProtectedRoute>
          <RestaurantFinder />
        </ProtectedRoute>
      ),
    },
    {
      path: "/explore/travel-buddy-finder",
      element: (
        <ProtectedRoute>
          <TravelBuddyPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/explore/itinerary-creator",
      element: (
        <ProtectedRoute>
          <ConstructionPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/explore/travel-journal",
      element: (
        <ProtectedRoute>
          <ConstructionPage />
        </ProtectedRoute>
      ),
    },
  ]);

  return router;
};

export default Router;
