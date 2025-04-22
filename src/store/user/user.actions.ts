import { createAction } from "@reduxjs/toolkit";
import type { User } from "../../models/interfaces/User/IUser";
export const setCurrentUser = createAction<User | null>("user/setCurrentUser");
