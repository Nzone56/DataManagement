import { RouterProvider } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { store } from "./store/store.ts";
import { router } from "./routes/DataRoutes.tsx";
import { ToastContainer } from "react-toastify";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { getSettings } from "./store/settings/settings.selector.ts";
import { useEffect } from "react";

const ThemedApp = () => {
  const { theme } = useSelector(getSettings);

  useEffect(() => {
    console.log(theme);
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return <RouterProvider router={router} />;
};

export const App = () => {
  return (
    <Provider store={store}>
      <ToastContainer position="top-center" autoClose={2000} style={{ fontSize: "1.6rem" }} />
      <ThemedApp />
    </Provider>
  );
};
