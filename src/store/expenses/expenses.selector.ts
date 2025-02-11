import { RootState } from "../store";

export const getExpenseConcepts = (state: RootState) => state.expenses.concepts;

export const getExpenses = (state: RootState) => state.expenses.expenses;
