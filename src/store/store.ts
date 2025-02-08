import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { userReducer } from "./user/user.reducer";
import { ClientsReducer } from "./clients/clients.reducer";

export const store = configureStore({
  reducer: {
    clients: ClientsReducer,
    user: userReducer,
  },
});

export interface ThunkApiConfig {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
}

// Infer the type of `store`
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
// Define a reusable type describing thunk functions
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>;
