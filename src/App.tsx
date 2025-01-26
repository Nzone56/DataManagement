import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { router } from "./routes/DataRoutes.tsx";
import "@fortawesome/fontawesome-free/css/all.min.css";

export const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};
