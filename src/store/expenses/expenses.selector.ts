import { RootState } from "../store";

export const getExpenseConcepts = (state: RootState) => state.expenses.concepts;
