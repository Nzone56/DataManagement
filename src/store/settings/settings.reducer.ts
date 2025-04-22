import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { setSettings, fetchSettings, updateSettings, addSettings } from "./settings.actions";
import type { ISettings } from "../../models/interfaces/Settings/ISettings";
import { toast } from "react-toastify";

interface SettingsReducer {
  settings: ISettings;
  loading: boolean;
  error: string | null;
}

const initialState: SettingsReducer = {
  settings: { id: "datamanagement_nubia", theme: "light", dateFormat: "international" },
  loading: false,
  error: null,
};

export const settingsReducer = createReducer(initialState, (builder) => {
  builder
    // FETCH SETTINGS
    .addCase(fetchSettings.pending, (state) => ({
      ...state,
      loading: true,
      error: null,
    }))

    .addCase(fetchSettings.fulfilled, (state, action: PayloadAction<ISettings>) => ({
      ...state,
      loading: false,
      settings: action.payload,
    }))

    .addCase(fetchSettings.rejected, (state, action) => {
      toast.error("Error al obtener la configuración");
      return {
        ...state,
        loading: false,
        error: action.error.message || "Error al obtener la configuración",
      };
    })

    // Add Settings
    .addCase(addSettings.pending, (state) => {
      state.loading = true;
    })
    .addCase(addSettings.fulfilled, (state, action: PayloadAction<ISettings>) => {
      state.loading = false;
      state.settings = action.payload;
      toast.success("Settings añadido con éxito");
    })
    .addCase(addSettings.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error al añadir abogado";
      toast.error(state.error);
    })

    // UPDATE SETTINGS
    .addCase(updateSettings.pending, (state) => ({
      ...state,
      loading: true,
      error: null,
    }))

    .addCase(updateSettings.fulfilled, (state, action: PayloadAction<ISettings>) => {
      state.loading = false;
      state.settings = action.payload;
      toast.success("Configuración actualizada con éxito");
    })

    .addCase(updateSettings.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error al actualizar la configuración";
      toast.error(state.error);
    })

    .addCase(setSettings, (state, action) => ({
      ...state,
      settings: action.payload,
    }));
});
