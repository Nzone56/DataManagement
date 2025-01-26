import { createAction } from "@reduxjs/toolkit";

import { Data } from "../models/interfaces/interfaces";

export const setInitialData = createAction<Data | null>("data/setInitialData");
