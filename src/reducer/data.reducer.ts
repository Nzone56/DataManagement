import { createReducer } from "@reduxjs/toolkit";
import { setInitialData } from "./data.actions";
import type { Data } from "../models/interfaces/interfaces";

interface DataReducer {
  data: Data | null;
}

const initialState: DataReducer = {
  data: {
    placeholder: {},
  },
};

export const dataReducer = createReducer(initialState, (builder) => {
  builder.addCase(setInitialData, (state, action) => ({
    ...state,
    data: action.payload,
  }));
});
