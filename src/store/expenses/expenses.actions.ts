import { createAsyncThunk } from "@reduxjs/toolkit";
import { Expense, ExpenseConcept, Fee } from "../../models/interfaces/Expense/IExpense";
import { ExpenseConceptService, ExpenseService, FeeService } from "./expenses.service";
import { ThunkApiConfig } from "../store";

// -- CONCEPTS -- //
export const fetchExpenseConcepts = createAsyncThunk<ExpenseConcept[]>("expenses/fetchConcepts", () =>
  ExpenseConceptService.fetchExpensesConcepts()
);

export const addExpenseConcept = createAsyncThunk<ExpenseConcept, ExpenseConcept, ThunkApiConfig>(
  "expenses/addConcept",
  (expenseConcept: ExpenseConcept) => ExpenseConceptService.addExpenseConcept(expenseConcept)
);
export const removeExpenseConcept = createAsyncThunk<string, string, ThunkApiConfig>(
  "expenses/removeConcept",
  (expenseConceptId: string) => {
    ExpenseConceptService.removeExpenseConcept(expenseConceptId);
    return expenseConceptId;
  }
);
export const updateExpenseConcept = createAsyncThunk<ExpenseConcept, ExpenseConcept, ThunkApiConfig>(
  "expenses/updateConcept",
  (expenseConcept: ExpenseConcept) => ExpenseConceptService.updateExpenseConcept(expenseConcept)
);

// -- EXPENSES -- //

export const fetchExpenses = createAsyncThunk<Expense[]>("expenses/fetchExpenses", () =>
  ExpenseService.fetchExpenses()
);

export const addExpense = createAsyncThunk<Expense, Expense, ThunkApiConfig>(
  "expenses/addeExpense",
  (expense: Expense) => ExpenseService.addExpense(expense)
);
export const removeExpense = createAsyncThunk<string, string, ThunkApiConfig>(
  "expenses/removeExpense",
  (expenseId: string) => {
    ExpenseService.removeExpense(expenseId);
    return expenseId;
  }
);
export const updateExpense = createAsyncThunk<Expense, Expense, ThunkApiConfig>(
  "expenses/updateExpense",
  (expense: Expense) => ExpenseService.updateExpense(expense)
);

// -- EXPENSES -- //

export const fetchFees = createAsyncThunk<Fee[]>("expenses/fetchFees", () => FeeService.fetchFees());

export const addFee = createAsyncThunk<Fee, Fee, ThunkApiConfig>("expenses/addeFee", (fee: Fee) =>
  FeeService.addFee(fee)
);
export const removeFee = createAsyncThunk<string, string, ThunkApiConfig>("expenses/removeFee", (feeId: string) => {
  FeeService.removeFee(feeId);
  return feeId;
});
export const updateFee = createAsyncThunk<Fee, Fee, ThunkApiConfig>("expenses/updateFee", (fee: Fee) =>
  FeeService.updateFee(fee)
);
