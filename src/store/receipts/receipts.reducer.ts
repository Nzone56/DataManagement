import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { addReceipt, fetchReceipts, removeReceipt, setReceipts, updateReceipt } from "./receipts.actions";
import { toast } from "react-toastify";
import type { Receipt } from "../../models/interfaces/Receipt/IReceipts";
interface ReceiptsReducer {
  receipts: Receipt[];
  loading: boolean;
  error: string | null;
}

const initialStateReceipts: ReceiptsReducer = {
  receipts: [],
  loading: false,
  error: null,
};

export const receiptsReducer = createReducer(initialStateReceipts, (builder) => {
  builder
    // Fetch ReceiptConcepts
    .addCase(fetchReceipts.pending, (state) => ({
      ...state,
      loading: true,
      error: null,
    }))
    .addCase(fetchReceipts.fulfilled, (state, action: PayloadAction<Receipt[]>) => ({
      ...state,
      loading: false,
      receipts: action.payload,
    }))
    .addCase(fetchReceipts.rejected, (state, action) => {
      toast.error("Error al obtener los receipts");
      return {
        ...state,
        loading: false,
        error: action.error.message || "Error al obtener los receipts",
      };
    })

    // Add Receipt
    .addCase(addReceipt.pending, (state) => {
      state.loading = true;
    })
    .addCase(addReceipt.fulfilled, (state, action: PayloadAction<Receipt>) => {
      state.loading = false;
      state.receipts.push(action.payload);
      toast.success("Receipt añadido con éxito");
    })
    .addCase(addReceipt.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error al añadir el Receipt";
      toast.error(state.error);
    })

    // Delete Receipt
    .addCase(removeReceipt.pending, (state) => {
      state.loading = true;
    })
    .addCase(removeReceipt.fulfilled, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.receipts = state.receipts.filter((receipts) => receipts.id !== action.payload);
      toast.success("Receipt eliminado con éxito");
    })
    .addCase(removeReceipt.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error al eliminar el Receipt";
      toast.error(state.error);
    })

    // Update Receipt
    .addCase(updateReceipt.pending, (state) => {
      state.loading = true;
    })
    .addCase(updateReceipt.fulfilled, (state, action: PayloadAction<Receipt>) => {
      state.loading = false;
      const index = state.receipts.findIndex((receipt) => receipt.id === action.payload.id);
      if (index !== -1) {
        state.receipts[index] = action.payload;
        toast.success("Receipt actualizado con éxito");
      }
    })
    .addCase(updateReceipt.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error al actualizar el concepto de Receipt";
      toast.error(state.error);
    })

    // Set Receipt
    .addCase(setReceipts.pending, (state) => {
      state.loading = true;
    })
    .addCase(setReceipts.fulfilled, (state, action: PayloadAction<Receipt[]>) => {
      state.loading = false;
      state.receipts = [...state.receipts, ...Object.values(action.payload)];
      toast.success("Receipts añadidos con éxito");
    })
    .addCase(setReceipts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error al subir los receipts";
      toast.error(state.error);
    });
});
