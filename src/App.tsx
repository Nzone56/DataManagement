import { RouterProvider } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { AppDispatch, store } from "./store/store.ts";
import { router } from "./routes/DataRoutes.tsx";
import { ToastContainer } from "react-toastify";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { getSettings } from "./store/settings/settings.selector.ts";
import { useEffect } from "react";
import { fetchAllData } from "./store/actions.ts";

const ThemedApp = () => {
  const { theme } = useSelector(getSettings);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    dispatch(fetchAllData());
    //eslint-disable-next-line
  }, []);

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
