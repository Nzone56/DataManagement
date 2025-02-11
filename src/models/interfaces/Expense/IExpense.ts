export interface ExpenseConcept {
  id: string;
  name: string;
  type: string;
  color: string;
}

export interface ExpenseConceptWorkLog {
  id: string;
  expensesConceptId: string;
  hoursWorked: number;
  month: number;
  year: number;
}

export interface Expense {
  id: string;
  conceptId: string;
  amount: number;
  date: number;
  description?: string;
}

export interface ExpenseWorklog {
  id: string;
  conceptId: string;
  amount: number;
  date: number;
  description?: string;
}
