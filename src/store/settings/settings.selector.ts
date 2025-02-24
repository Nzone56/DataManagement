import { RootState } from "../store";

export const getSettings = (state: RootState) => state.settings.settings;
