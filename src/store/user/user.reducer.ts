import { createReducer } from "@reduxjs/toolkit";
import type { User } from "../../models/interfaces/User/IUser";
import { setCurrentUser } from "./user.actions";

interface UserReducer {
  currentUser: User | null;
}

const initialState: UserReducer = {
  currentUser: {
    uid: "",
    name: "",
    lastname: "",
    email: "",
    company: "",
  },
};

export const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(setCurrentUser, (state, action) => ({
    ...state,
    currentUser: action.payload,
  }));
});
