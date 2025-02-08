export interface ExpenseConcept {
  id: string;
  name: string;
  type: string;
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
  date: string;
  description?: string;
}
