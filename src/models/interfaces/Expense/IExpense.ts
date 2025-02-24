export interface ExpenseConcept {
  id: string;
  name: string;
  type: string;
  color: string;
}

export interface Expense {
  id: string;
  conceptId: string;
  amount: number;
  date: number;
  description?: string;
}
