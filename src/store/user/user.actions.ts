import { createAction } from "@reduxjs/toolkit";
import { User } from "../../models/interfaces/User/IUser";
export const setCurrentUser = createAction<User | null>("user/setCurrentUser");
