import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "../components/pages/ErrorPage";
import { LandingPage } from "../components/pages/LandingPage";
import { restrictAccess, checkUser } from "../utils/authLoader";
import { HomePage } from "../components/pages/HomePage";
import { ClientsPage } from "../components/pages/ClientsPage";
import { LawyersPage } from "../components/pages/LawyersPage";
import { ConceptsPage } from "../components/pages/ExpensesPage/ConceptsPage";
import { ManagePage } from "../components/pages/ExpensesPage/ManagePage";

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
    {
      path: "/clients",
      element: <ClientsPage />,
      loader: restrictAccess,
    },
    {
      path: "/lawyers",
      element: <LawyersPage />,
      loader: restrictAccess,
    },
    {
      path: "/expenses/concepts",
      element: <ConceptsPage />,
      loader: restrictAccess,
    },
    {
      path: "/expenses/manage",
      element: <ManagePage />,
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
