import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "../components/pages/ErrorPage";
import { HomePage } from "../components/pages/HomePage";
import { LandingPage } from "../components/pages/LandingPage";
import { restrictAccess, checkUser } from "../utils/authLoader";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <LandingPage />,
      loader: checkUser,
      errorElement: <ErrorPage />,
    },
    {
      path: "/home",
      element: <HomePage />,
      loader: restrictAccess,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);
