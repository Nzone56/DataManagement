import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { dataReducer } from "./data/data.reducer";
import { userReducer } from "./user/user.reducer";

export const store = configureStore({
  reducer: {
    data: dataReducer,
    user: userReducer,
  },
});

// Infer the type of `store`
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
// Define a reusable type describing thunk functions
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
