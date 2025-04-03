export interface ExpenseConcept {
  id: string;
  name: string;
  type: string;
  color: string;
  categories: string[];
}

export interface Expense {
  id: string;
  conceptId: string;
  categoryId: string;
  amount: number;
  date: number;
  description?: string;
}

export interface Fee {
  id: string;
  feeConcept: "Germán Ulloa" | "Carlos Bermúdez";
  conceptId: string;
  categoryId: string;
  amount: number;
  date: number;
  description?: string;
}

export interface rawConcept {
  Concepto: string;
}

export interface RawExpense {
  Concepto: string;
  amount: number;
  date: number;
}

export interface RawFee {
  Concepto: string;
  feeConcept: "Germán Ulloa" | "Carlos Bermúdez";
  amount: number;
  date: number;
}
