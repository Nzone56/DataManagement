import { combineReducers, createReducer, PayloadAction } from "@reduxjs/toolkit";
import { addExpenseConcept, fetchExpenseConcept, removeExpenseConcept, updateExpenseConcept } from "./expenses.actions";
import { ExpenseConcept } from "../../models/interfaces/Expense/IExpense";
import { toast } from "react-toastify";

interface ExpenseConceptsReducer {
  expensesConcepts: ExpenseConcept[];
  loading: boolean;
  error: string | null;
}

const initialState: ExpenseConceptsReducer = {
  expensesConcepts: [],
  loading: false,
  error: null,
};

export const expensesConceptsReducer = createReducer(initialState, (builder) => {
  builder
    // Fetch ExpenseConcepts
    .addCase(fetchExpenseConcept.pending, (state) => ({
      ...state,
      loading: true,
      error: null,
    }))
    .addCase(fetchExpenseConcept.fulfilled, (state, action: PayloadAction<ExpenseConcept[]>) => ({
      ...state,
      loading: false,
      expensesConcepts: action.payload,
    }))
    .addCase(fetchExpenseConcept.rejected, (state, action) => {
      toast.error("Error al obtener los conceptos de los gastos");
      return {
        ...state,
        loading: false,
        error: action.error.message || "Error al obtener concepto de gasto",
      };
    })

    // Add expensesConcept
    .addCase(addExpenseConcept.pending, (state) => {
      state.loading = true;
    })
    .addCase(addExpenseConcept.fulfilled, (state, action: PayloadAction<ExpenseConcept>) => {
      state.loading = false;
      state.expensesConcepts.push(action.payload);
      toast.success("Concepto de gasto añadido con éxito");
    })
    .addCase(addExpenseConcept.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error al añadir concepto de gasto";
      toast.error(state.error);
    })

    // Delete expensesConcept
    .addCase(removeExpenseConcept.pending, (state) => {
      state.loading = true;
    })
    .addCase(removeExpenseConcept.fulfilled, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.expensesConcepts = state.expensesConcepts.filter(
        (expensesConcept) => expensesConcept.id !== action.payload
      );
      toast.success("Concepto de gasto eliminado con éxito");
    })
    .addCase(removeExpenseConcept.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error al eliminar concepto de gasto";
      toast.error(state.error);
    })

    // Update ExpenseConcepte
    .addCase(updateExpenseConcept.pending, (state) => {
      state.loading = true;
    })
    .addCase(updateExpenseConcept.fulfilled, (state, action: PayloadAction<ExpenseConcept>) => {
      state.loading = false;
      const index = state.expensesConcepts.findIndex((expensesConcept) => expensesConcept.id === action.payload.id);
      if (index !== -1) {
        state.expensesConcepts[index] = action.payload;
        toast.success("Concepto de gasto actualizado con éxito");
      }
    })
    .addCase(updateExpenseConcept.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error al actualizar el concepto de gasto";
      toast.error(state.error);
    });
});

export const expensesReducer = combineReducers({
  concepts: expensesConceptsReducer,
  // expenses: ExpensesReducer,
});
