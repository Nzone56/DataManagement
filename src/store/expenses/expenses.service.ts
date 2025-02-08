import { ExpenseConcept } from "../../models/interfaces/Expense/IExpense";

// Base URL de json-server
const API_URL = "http://localhost:3000/expensesConcepts";

const fetchExpenseConcept = async () => {
  const response = await fetch(API_URL);
  return (await response.json()) as ExpenseConcept[];
};

const addExpenseConcept = async (expensesConcept: ExpenseConcept) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expensesConcept),
  });

  return await response.json();
};

const updateExpenseConcept = async (expensesConcept: ExpenseConcept) => {
  const response = await fetch(`http://localhost:3000/expensesConcepts/${expensesConcept.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expensesConcept),
  });

  return await response.json();
};

const removeExpenseConcept = async (id: string) => {
  const response = await fetch(`http://localhost:3000/expensesConcepts/${id}`, { method: "DELETE" });
  return await response.json();
};

export const ExpenseConceptService = {
  fetchExpenseConcept,
  addExpenseConcept,
  updateExpenseConcept,
  removeExpenseConcept,
};
