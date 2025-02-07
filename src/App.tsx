import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { router } from "./routes/DataRoutes.tsx";
import { ToastContainer } from "react-toastify";
import "@fortawesome/fontawesome-free/css/all.min.css";

export const App = () => {
  return (
    <Provider store={store}>
      <ToastContainer position="top-center" autoClose={2000} />
      <RouterProvider router={router} />
    </Provider>
  );
};
