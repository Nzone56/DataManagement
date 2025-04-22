import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { addWorklog, fetchWorklogs, removeWorklog, setWorklogs, updateWorklog } from "./worklogs.actions";
import { toast } from "react-toastify";
import type { Worklog } from "../../models/interfaces/TimeManager/IWorklog";

interface WorklogsReducer {
  worklogs: Worklog[];
  loading: boolean;
  error: string | null;
}

const initialStateWorklogs: WorklogsReducer = {
  worklogs: [],
  loading: false,
  error: null,
};

export const worklogsReducer = createReducer(initialStateWorklogs, (builder) => {
  builder
    // Fetch WorklogConcepts
    .addCase(fetchWorklogs.pending, (state) => ({
      ...state,
      loading: true,
      error: null,
    }))
    .addCase(fetchWorklogs.fulfilled, (state, action: PayloadAction<Worklog[]>) => ({
      ...state,
      loading: false,
      worklogs: action.payload,
    }))
    .addCase(fetchWorklogs.rejected, (state, action) => {
      toast.error("Error al obtener los worklogs");
      return {
        ...state,
        loading: false,
        error: action.error.message || "Error al obtener los worklogs",
      };
    })

    // Add Worklog
    .addCase(addWorklog.pending, (state) => {
      state.loading = true;
    })
    .addCase(addWorklog.fulfilled, (state, action: PayloadAction<Worklog>) => {
      state.loading = false;
      state.worklogs.push(action.payload);
      toast.success("Worklog añadido con éxito");
    })
    .addCase(addWorklog.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error al añadir el Worklog";
      toast.error(state.error);
    })

    // Delete Worklog
    .addCase(removeWorklog.pending, (state) => {
      state.loading = true;
    })
    .addCase(removeWorklog.fulfilled, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.worklogs = state.worklogs.filter((worklogs) => worklogs.id !== action.payload);
      toast.success("Worklog eliminado con éxito");
    })
    .addCase(removeWorklog.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error al eliminar el Worklog";
      toast.error(state.error);
    })

    // Update Worklog
    .addCase(updateWorklog.pending, (state) => {
      state.loading = true;
    })
    .addCase(updateWorklog.fulfilled, (state, action: PayloadAction<Worklog>) => {
      state.loading = false;
      const index = state.worklogs.findIndex((worklog) => worklog.id === action.payload.id);
      if (index !== -1) {
        state.worklogs[index] = action.payload;
        toast.success("Worklog actualizado con éxito");
      }
    })
    .addCase(updateWorklog.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error al actualizar el concepto de Worklog";
      toast.error(state.error);
    })

    // Set Worklog
    .addCase(setWorklogs.pending, (state) => {
      state.loading = true;
    })
    .addCase(setWorklogs.fulfilled, (state, action: PayloadAction<Worklog[]>) => {
      state.loading = false;
      state.worklogs = [...state.worklogs, ...Object.values(action.payload)];
      toast.success("Worklogs añadidos con éxito");
    })
    .addCase(setWorklogs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error al subir los worklogs";
      toast.error(state.error);
    });
});
