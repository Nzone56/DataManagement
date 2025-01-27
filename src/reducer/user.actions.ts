import { createAction } from "@reduxjs/toolkit";

import type { User } from "../models/interfaces/interfaces";

export const setCurrentUser = createAction<User | null>("user/setCurrentUser");
