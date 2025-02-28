export interface ExpenseConcept {
  id: string;
  name: string;
  type: string;
  color: string;
  subConcepts: string[];
}

export interface Expense {
  id: string;
  conceptId: string;
  amount: number;
  date: number;
  description?: string;
}

export interface Fee {
  id: string;
  feeConcept: "Germán Ulloa" | "Carlos Bermúdez";
  amount: number;
  date: number;
  description?: string;
}
