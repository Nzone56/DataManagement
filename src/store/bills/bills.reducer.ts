import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { addBill, fetchBills, removeBill, setBills, updateBill } from "./bills.actions";
import { toast } from "react-toastify";
import { Bill } from "../../models/interfaces/Bill/IBill";

interface BillsReducer {
  bills: Bill[];
  loading: boolean;
  error: string | null;
}

const initialStateBills: BillsReducer = {
  bills: [],
  loading: false,
  error: null,
};

export const billsReducer = createReducer(initialStateBills, (builder) => {
  builder
    // Fetch BillConcepts
    .addCase(fetchBills.pending, (state) => ({
      ...state,
      loading: true,
      error: null,
    }))
    .addCase(fetchBills.fulfilled, (state, action: PayloadAction<Bill[]>) => ({
      ...state,
      loading: false,
      bills: action.payload,
    }))
    .addCase(fetchBills.rejected, (state, action) => {
      toast.error("Error al obtener los bills");
      return {
        ...state,
        loading: false,
        error: action.error.message || "Error al obtener los bills",
      };
    })

    // Add Bill
    .addCase(addBill.pending, (state) => {
      state.loading = true;
    })
    .addCase(addBill.fulfilled, (state, action: PayloadAction<Bill>) => {
      state.loading = false;
      state.bills.push(action.payload);
      toast.success("Bill añadido con éxito");
    })
    .addCase(addBill.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error al añadir el Bill";
      toast.error(state.error);
    })

    // Delete Bill
    .addCase(removeBill.pending, (state) => {
      state.loading = true;
    })
    .addCase(removeBill.fulfilled, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.bills = state.bills.filter((bills) => bills.id !== action.payload);
      toast.success("Bill eliminado con éxito");
    })
    .addCase(removeBill.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error al eliminar el Bill";
      toast.error(state.error);
    })

    // Update Bill
    .addCase(updateBill.pending, (state) => {
      state.loading = true;
    })
    .addCase(updateBill.fulfilled, (state, action: PayloadAction<Bill>) => {
      state.loading = false;
      const index = state.bills.findIndex((bill) => bill.id === action.payload.id);
      if (index !== -1) {
        state.bills[index] = action.payload;
        toast.success("Bill actualizado con éxito");
      }
    })
    .addCase(updateBill.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error al actualizar el concepto de Bill";
      toast.error(state.error);
    })

    // Set Bill
    .addCase(setBills.pending, (state) => {
      state.loading = true;
    })
    .addCase(setBills.fulfilled, (state, action: PayloadAction<Bill[]>) => {
      state.loading = false;
      state.bills = [...state.bills, ...Object.values(action.payload)];
      toast.success("Bills añadidos con éxito");
    })
    .addCase(setBills.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error al subir los bills";
      toast.error(state.error);
    });
});
