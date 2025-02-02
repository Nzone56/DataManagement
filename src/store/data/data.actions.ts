import { createAction } from "@reduxjs/toolkit";

import type { Data } from "../models/interfaces/User/interfaces";

export const setInitialData = createAction<Data | null>("data/setInitialData");
