import { createAsyncThunk } from "@reduxjs/toolkit";
import { ExpenseConcept } from "../../models/interfaces/Expense/IExpense";
import { ExpenseConceptService } from "./expenses.service";
import { ThunkApiConfig } from "../store";

export const addExpenseConcept = createAsyncThunk<ExpenseConcept, ExpenseConcept, ThunkApiConfig>(
  "expenses/addConcept",
  (expensesConcept: ExpenseConcept) => ExpenseConceptService.addExpenseConcept(expensesConcept)
);
export const removeExpenseConcept = createAsyncThunk<string, string, ThunkApiConfig>(
  "expenses/removeConcept",
  (expensesConceptId: string) => {
    ExpenseConceptService.removeExpenseConcept(expensesConceptId);
    return expensesConceptId;
  }
);
export const updateExpenseConcept = createAsyncThunk<ExpenseConcept, ExpenseConcept, ThunkApiConfig>(
  "expenses/updateConcept",
  (expensesConcept: ExpenseConcept) => ExpenseConceptService.updateExpenseConcept(expensesConcept)
);
export const fetchExpenseConcept = createAsyncThunk<ExpenseConcept[]>("expenses/fetchConcepts", () =>
  ExpenseConceptService.fetchExpenseConcept()
);
