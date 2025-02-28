import { RootState } from "../store";

export const getExpenseConcepts = (state: RootState) => state.expenses.concepts;

export const getExpenses = (state: RootState) => state.expenses.expenses;

export const getFees = (state: RootState) => state.expenses.fees;
