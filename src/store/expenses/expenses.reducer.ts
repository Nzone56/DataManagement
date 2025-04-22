import { combineReducers, createReducer, PayloadAction } from "@reduxjs/toolkit";
import {
  addExpense,
  addExpenseConcept,
  addFee,
  fetchExpenseConcepts,
  fetchExpenses,
  fetchFees,
  removeExpense,
  removeExpenseConcept,
  removeFee,
  setExpenses,
  setExpensesConcepts,
  setFees,
  updateExpense,
  updateExpenseConcept,
  updateFee,
} from "./expenses.actions";
import type { Expense, ExpenseConcept, Fee } from "../../models/interfaces/Expense/IExpense";
import { toast } from "react-toastify";

interface ExpenseConceptsReducer {
  expensesConcepts: ExpenseConcept[];
  loading: boolean;
  error: string | null;
}

const initialStateConcepts: ExpenseConceptsReducer = {
  expensesConcepts: [],
  loading: false,
  error: null,
};

interface ExpensesReducer {
  expenses: Expense[];
  loading: boolean;
  error: string | null;
}

const initialStateExpenses: ExpensesReducer = {
  expenses: [],
  loading: false,
  error: null,
};

interface FeesReducer {
  fees: Fee[];
  loading: boolean;
  error: string | null;
}

const initialStateFees: FeesReducer = {
  fees: [],
  loading: false,
  error: null,
};

const expensesConceptsReducer = createReducer(initialStateConcepts, (builder) => {
  builder
    // Fetch Concept
    .addCase(fetchExpenseConcepts.pending, (state) => ({
      ...state,
      loading: true,
      error: null,
    }))
    .addCase(fetchExpenseConcepts.fulfilled, (state, action: PayloadAction<ExpenseConcept[]>) => ({
      ...state,
      loading: false,
      expensesConcepts: action.payload,
    }))
    .addCase(fetchExpenseConcepts.rejected, (state, action) => {
      toast.error("Error al obtener los conceptos de los gastos");
      return {
        ...state,
        loading: false,
        error: action.error.message || "Error al obtener concepto de gasto",
      };
    })

    // Add Concept
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

    // Delete Concept
    .addCase(removeExpenseConcept.pending, (state) => {
      state.loading = true;
    })
    .addCase(removeExpenseConcept.fulfilled, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.expensesConcepts = state.expensesConcepts.filter((expenseConcept) => expenseConcept.id !== action.payload);
      toast.success("Concepto de gasto eliminado con éxito");
    })
    .addCase(removeExpenseConcept.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error al eliminar concepto de gasto";
      toast.error(state.error);
    })

    // Update Concept
    .addCase(updateExpenseConcept.pending, (state) => {
      state.loading = true;
    })
    .addCase(updateExpenseConcept.fulfilled, (state, action: PayloadAction<ExpenseConcept>) => {
      state.loading = false;
      const index = state.expensesConcepts.findIndex((expenseConcept) => expenseConcept.id === action.payload.id);
      if (index !== -1) {
        state.expensesConcepts[index] = action.payload;
        toast.success("Concepto de gasto actualizado con éxito");
      }
    })
    .addCase(updateExpenseConcept.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error al actualizar el concepto de gasto";
      toast.error(state.error);
    })

    // Set Concepts
    .addCase(setExpensesConcepts.pending, (state) => {
      state.loading = true;
    })
    .addCase(setExpensesConcepts.fulfilled, (state, action: PayloadAction<ExpenseConcept[]>) => {
      state.loading = false;
      state.expensesConcepts = [...state.expensesConcepts, ...Object.values(action.payload)];
      toast.success("Conceptos añadidos con éxito");
    })
    .addCase(setExpensesConcepts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error al subir los conceptos";
      toast.error(state.error);
    });
});

const expensesManageReducer = createReducer(initialStateExpenses, (builder) => {
  builder
    // Fetch Expenses
    .addCase(fetchExpenses.pending, (state) => ({
      ...state,
      loading: true,
      error: null,
    }))
    .addCase(fetchExpenses.fulfilled, (state, action: PayloadAction<Expense[]>) => ({
      ...state,
      loading: false,
      expenses: action.payload,
    }))
    .addCase(fetchExpenses.rejected, (state, action) => {
      toast.error("Error al obtener los gastos");
      return {
        ...state,
        loading: false,
        error: action.error.message || "Error al obtener los gastos",
      };
    })

    // Add Expense
    .addCase(addExpense.pending, (state) => {
      state.loading = true;
    })
    .addCase(addExpense.fulfilled, (state, action: PayloadAction<Expense>) => {
      state.loading = false;
      state.expenses.push(action.payload);
      toast.success("Gasto añadido con éxito");
    })
    .addCase(addExpense.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error al añadir el gasto";
      toast.error(state.error);
    })

    // Delete Expense
    .addCase(removeExpense.pending, (state) => {
      state.loading = true;
    })
    .addCase(removeExpense.fulfilled, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.expenses = state.expenses.filter((expenses) => expenses.id !== action.payload);
      toast.success("Gasto eliminado con éxito");
    })
    .addCase(removeExpense.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error al eliminar el gasto";
      toast.error(state.error);
    })

    // Update Expense
    .addCase(updateExpense.pending, (state) => {
      state.loading = true;
    })
    .addCase(updateExpense.fulfilled, (state, action: PayloadAction<Expense>) => {
      state.loading = false;
      const index = state.expenses.findIndex((expense) => expense.id === action.payload.id);
      if (index !== -1) {
        state.expenses[index] = action.payload;
        toast.success("Gasto actualizado con éxito");
      }
    })
    .addCase(updateExpense.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error al actualizar el concepto de gasto";
      toast.error(state.error);
    })

    // Set Concepts
    .addCase(setExpenses.pending, (state) => {
      state.loading = true;
    })
    .addCase(setExpenses.fulfilled, (state, action: PayloadAction<Expense[]>) => {
      state.loading = false;
      state.expenses = [...state.expenses, ...Object.values(action.payload)];
      toast.success(" Gastos añadidos con éxito");
    })
    .addCase(setExpenses.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error al subir los gastos";
      toast.error(state.error);
    });
});

const feesReducer = createReducer(initialStateFees, (builder) => {
  builder
    // Fetch FeeConcepts
    .addCase(fetchFees.pending, (state) => ({
      ...state,
      loading: true,
      error: null,
    }))
    .addCase(fetchFees.fulfilled, (state, action: PayloadAction<Fee[]>) => ({
      ...state,
      loading: false,
      fees: action.payload,
    }))
    .addCase(fetchFees.rejected, (state, action) => {
      toast.error("Error al obtener los honorarios");
      return {
        ...state,
        loading: false,
        error: action.error.message || "Error al obtener los honorarios",
      };
    })

    // Add Fee
    .addCase(addFee.pending, (state) => {
      state.loading = true;
    })
    .addCase(addFee.fulfilled, (state, action: PayloadAction<Fee>) => {
      state.loading = false;
      state.fees.push(action.payload);
      toast.success("Honorario añadido con éxito");
    })
    .addCase(addFee.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error al añadir el honorario";
      toast.error(state.error);
    })

    // Delete Fee
    .addCase(removeFee.pending, (state) => {
      state.loading = true;
    })
    .addCase(removeFee.fulfilled, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.fees = state.fees.filter((fees) => fees.id !== action.payload);
      toast.success("Honorario eliminado con éxito");
    })
    .addCase(removeFee.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error al eliminar el Honorario";
      toast.error(state.error);
    })

    // Update Fee
    .addCase(updateFee.pending, (state) => {
      state.loading = true;
    })
    .addCase(updateFee.fulfilled, (state, action: PayloadAction<Fee>) => {
      state.loading = false;
      const index = state.fees.findIndex((fee) => fee.id === action.payload.id);
      if (index !== -1) {
        state.fees[index] = action.payload;
        toast.success("Honorario actualizado con éxito");
      }
    })
    .addCase(updateFee.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error al actualizar el concepto de Honorario";
      toast.error(state.error);
    })
    // Set Fees
    .addCase(setFees.pending, (state) => {
      state.loading = true;
    })
    .addCase(setFees.fulfilled, (state, action: PayloadAction<Fee[]>) => {
      state.loading = false;
      state.fees = [...state.fees, ...Object.values(action.payload)];
      toast.success(" Honorarios añadidos con éxito");
    })
    .addCase(setFees.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error al subir los honorarios";
      toast.error(state.error);
    });
});

export const expensesReducer = combineReducers({
  concepts: expensesConceptsReducer,
  expenses: expensesManageReducer,
  fees: feesReducer,
});
