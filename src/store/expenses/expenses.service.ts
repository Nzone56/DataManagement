import { Expense, ExpenseConcept, Fee } from "../../models/interfaces/Expense/IExpense";
import { collection, getDocs, updateDoc, doc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../../server/firebase";
import { COLLECTION_CONCEPTS, COLLECTION_EXPENSES, COLLECTION_FEES } from "../../server/collections";

// -- EXPENSE CONCEPTS -- //
const fetchExpensesConcepts = async () => {
  const querySnapshot = await getDocs(collection(db, COLLECTION_CONCEPTS));
  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as ExpenseConcept[];
};

const addExpenseConcept = async (expensesConcept: ExpenseConcept) => {
  const addExpenseConceptRef = doc(db, COLLECTION_CONCEPTS, expensesConcept.id);
  await setDoc(addExpenseConceptRef, expensesConcept);
  return expensesConcept;
};

const updateExpenseConcept = async (expensesConcept: ExpenseConcept) => {
  const docRef = doc(db, COLLECTION_CONCEPTS, expensesConcept.id);
  await updateDoc(docRef, { ...expensesConcept });
  return expensesConcept;
};

const removeExpenseConcept = async (id: string) => {
  await deleteDoc(doc(db, COLLECTION_CONCEPTS, id));
  return { id };
};

export const ExpenseConceptService = {
  fetchExpensesConcepts,
  addExpenseConcept,
  updateExpenseConcept,
  removeExpenseConcept,
};

// -- EXPENSES -- //
const fetchExpenses = async () => {
  const querySnapshot = await getDocs(collection(db, COLLECTION_EXPENSES));
  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Expense[];
};

const addExpense = async (expense: Expense) => {
  const addExpenseRef = doc(db, COLLECTION_EXPENSES, expense.id);
  await setDoc(addExpenseRef, expense);
  return expense;
};

const updateExpense = async (expense: Expense) => {
  const docRef = doc(db, COLLECTION_EXPENSES, expense.id);
  await updateDoc(docRef, { ...expense });
  return expense;
};

const removeExpense = async (id: string) => {
  await deleteDoc(doc(db, COLLECTION_EXPENSES, id));
  return { id };
};

export const ExpenseService = {
  fetchExpenses,
  addExpense,
  updateExpense,
  removeExpense,
};

// -- FEES -- //
const fetchFees = async () => {
  const querySnapshot = await getDocs(collection(db, COLLECTION_FEES));
  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Fee[];
};

const addFee = async (fee: Fee) => {
  const addFeeRef = doc(db, COLLECTION_FEES, fee.id);
  await setDoc(addFeeRef, fee);
  return fee;
};

const updateFee = async (fee: Fee) => {
  const docRef = doc(db, COLLECTION_FEES, fee.id);
  await updateDoc(docRef, { ...fee });
  return fee;
};

const removeFee = async (id: string) => {
  await deleteDoc(doc(db, COLLECTION_FEES, id));
  return { id };
};

export const FeeService = {
  fetchFees,
  addFee,
  updateFee,
  removeFee,
};
