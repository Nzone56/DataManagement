import { Expense, ExpenseConcept } from "../../models/interfaces/Expense/IExpense";

// -- EXPENSE CONCECEPTS -- //
// Base URL de json-server
const API_URL_CONCEPTS = "http://localhost:3000/expensesConcepts";

const fetchExpensesConcepts = async () => {
  const response = await fetch(API_URL_CONCEPTS);
  return (await response.json()) as ExpenseConcept[];
};

const addExpenseConcept = async (expensesConcept: ExpenseConcept) => {
  const response = await fetch(API_URL_CONCEPTS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expensesConcept),
  });

  return await response.json();
};

const updateExpenseConcept = async (expensesConcept: ExpenseConcept) => {
  const response = await fetch(`${API_URL_CONCEPTS}/${expensesConcept.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expensesConcept),
  });

  return await response.json();
};

const removeExpenseConcept = async (id: string) => {
  console.log();
  const response = await fetch(`${API_URL_CONCEPTS}/${id}`, { method: "DELETE" });
  return await response.json();
};

export const ExpenseConceptService = {
  fetchExpensesConcepts,
  addExpenseConcept,
  updateExpenseConcept,
  removeExpenseConcept,
};

// -- EXPENSEs -- //
// Base URL de json-server
const API_URL_EXPENSES = "http://localhost:3000/expenses";

const fetchExpenses = async () => {
  const response = await fetch(API_URL_EXPENSES);
  return (await response.json()) as Expense[];
};

const addExpense = async (expense: Expense) => {
  const response = await fetch(API_URL_EXPENSES, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  });

  return await response.json();
};

const updateExpense = async (expense: Expense) => {
  const response = await fetch(`${API_URL_EXPENSES}${expense.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  });

  return await response.json();
};

const removeExpense = async (id: string) => {
  const response = await fetch(`${API_URL_EXPENSES}/${id}`, { method: "DELETE" });
  return await response.json();
};

export const ExpenseService = {
  fetchExpenses,
  addExpense,
  updateExpense,
  removeExpense,
};
