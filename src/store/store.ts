import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { userReducer } from "./user/user.reducer";
import { clientsReducer } from "./clients/clients.reducer";
import { lawyersReducer } from "./lawyers/lawyers.reducer";
import { expensesReducer } from "./expenses/expenses.reducer";
import { settingsReducer } from "./settings/settings.reducer";
import { worklogsReducer } from "./worklogs/worklogs.reducer";
import { billsReducer } from "./bills/bills.reducer";
import { receiptsReducer } from "./receipts/receipts.reducer";

export const store = configureStore({
  reducer: {
    clients: clientsReducer,
    lawyers: lawyersReducer,
    user: userReducer,
    expenses: expensesReducer,
    settings: settingsReducer,
    worklogs: worklogsReducer,
    bills: billsReducer,
    receipts: receiptsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable Middleware for development
    }),
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
