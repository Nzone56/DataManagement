import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { SettingsService } from "./settings.service";
import { ISettings } from "../../models/interfaces/Settings/ISettings";
import { ThunkApiConfig } from "../store";

export const fetchSettings = createAsyncThunk<ISettings>("settings/fetchSettings", () =>
  SettingsService.fetchSettings()
);
export const updateSettings = createAsyncThunk<ISettings, ISettings, ThunkApiConfig>(
  "settings/updateSettings",
  (settings: ISettings) => SettingsService.updateSettings(settings)
);

export const setSettings = createAction<ISettings>("settings/setSettings");
