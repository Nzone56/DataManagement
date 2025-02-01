import { createAction } from "@reduxjs/toolkit";

import type { User } from "../models/interfaces/User/interfaces";

export const setCurrentUser = createAction<User | null>("user/setCurrentUser");
