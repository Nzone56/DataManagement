import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { addLawyer, fetchLawyers, removeLawyer, updateLawyer } from "./lawyers.actions";
import { Lawyer } from "../../models/interfaces/Lawyer/ILawyer";
import { toast } from "react-toastify";

interface LawyersReducer {
  lawyers: Lawyer[];
  loading: boolean;
  error: string | null;
}

const initialState: LawyersReducer = {
  lawyers: [],
  loading: false,
  error: null,
};

export const lawyersReducer = createReducer(initialState, (builder) => {
  builder
    // Fetch Lawyers
    .addCase(fetchLawyers.pending, (state) => ({
      ...state,
      loading: true,
      error: null,
    }))
    .addCase(fetchLawyers.fulfilled, (state, action: PayloadAction<Lawyer[]>) => ({
      ...state,
      loading: false,
      lawyers: action.payload,
    }))
    .addCase(fetchLawyers.rejected, (state, action) => {
      toast.error("Error al obtener los abogados");
      return {
        ...state,
        loading: false,
        error: action.error.message || "Error al obtener los abogados",
      };
    })

    // Add lawyer
    .addCase(addLawyer.pending, (state) => {
      state.loading = true;
    })
    .addCase(addLawyer.fulfilled, (state, action: PayloadAction<Lawyer>) => {
      state.loading = false;
      state.lawyers.push(action.payload);
      toast.success("Abogado añadido con éxito");
    })
    .addCase(addLawyer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error al añadir abogado";
      toast.error(state.error);
    })

    // Delete lawyer
    .addCase(removeLawyer.pending, (state) => {
      state.loading = true;
    })
    .addCase(removeLawyer.fulfilled, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.lawyers = state.lawyers.filter((lawyer) => lawyer.id !== action.payload);
      toast.success("Abogado eliminado con éxito");
    })
    .addCase(removeLawyer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error al eliminar abogado";
      toast.error(state.error);
    })

    // Update Lawyere
    .addCase(updateLawyer.pending, (state) => {
      state.loading = true;
    })
    .addCase(updateLawyer.fulfilled, (state, action: PayloadAction<Lawyer>) => {
      state.loading = false;
      const index = state.lawyers.findIndex((lawyer) => lawyer.id === action.payload.id);
      if (index !== -1) {
        state.lawyers[index] = action.payload;
        toast.success("Abogado actualizado con éxito");
      }
    })
    .addCase(updateLawyer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error al actualizar abogado";
      toast.error(state.error);
    });
});
