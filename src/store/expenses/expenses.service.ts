import type { Expense, ExpenseConcept, Fee } from "../../models/interfaces/Expense/IExpense";
import { collection, getDocs, updateDoc, doc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../../server/firebase";
import { COLLECTION_CONCEPTS, COLLECTION_EXPENSES, COLLECTION_FEES } from "../../server/collections";
import { getFromIndexedDB, openDatabase, saveToIndexedDB } from "../indexedDb.service";

// -- EXPENSE CONCEPTS -- //
export const fetchExpensesConcepts = async (): Promise<ExpenseConcept[]> => {
  console.log("📌 Ejecutando fetchExpensesConcepts...");

  const cachedConcepts = await getFromIndexedDB("expensesConcepts");
  console.log(cachedConcepts);
  if (cachedConcepts && cachedConcepts.length > 0) {
    console.log("📌 Cargando 'expensesConcepts' desde IndexedDB...");
    return cachedConcepts as ExpenseConcept[];
  }

  console.log("🔥 No hay caché, obteniendo 'expensesConcepts' desde Firestore...");
  const querySnapshot = await getDocs(collection(db, COLLECTION_CONCEPTS));

  const concepts = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as ExpenseConcept[];

  if (concepts.length > 0) {
    await saveToIndexedDB("expensesConcepts", concepts);
    console.log("✅ 'expensesConcepts' sincronizados en IndexedDB.");
  } else {
    console.log("⚠️ No se encontraron 'expensesConcepts' en Firestore, no se guardó en IndexedDB.");
  }

  return concepts;
};

const addExpenseConcept = async (expensesConcept: ExpenseConcept) => {
  const addExpenseConceptRef = doc(db, COLLECTION_CONCEPTS, expensesConcept.id);
  await setDoc(addExpenseConceptRef, expensesConcept);
  // Actualizar IndexedDB
  await saveToIndexedDB(COLLECTION_CONCEPTS, [expensesConcept]);
  return expensesConcept;
};

const updateExpenseConcept = async (expensesConcept: ExpenseConcept) => {
  const docRef = doc(db, COLLECTION_CONCEPTS, expensesConcept.id);
  await updateDoc(docRef, { ...expensesConcept });
  // Actualizar IndexedDB
  await saveToIndexedDB(COLLECTION_CONCEPTS, [expensesConcept]);
  return expensesConcept;
};

const removeExpenseConcept = async (id: string) => {
  await deleteDoc(doc(db, COLLECTION_CONCEPTS, id));

  // Eliminar de IndexedDB
  const indexeddb = await openDatabase();
  const tx = indexeddb.transaction(COLLECTION_CONCEPTS, "readwrite");
  const store = tx.objectStore(COLLECTION_CONCEPTS);
  store.delete(id);

  return { id };
};

const setConcepts = async (expensesConcepts: ExpenseConcept[]) => {
  const requests = expensesConcepts.map(async (expenseConcept) => {
    const docRef = doc(collection(db, COLLECTION_CONCEPTS), expenseConcept.id);
    await setDoc(docRef, expenseConcept);
    return expenseConcept;
  });

  await saveToIndexedDB(COLLECTION_CONCEPTS, expensesConcepts);

  return Promise.all(requests);
};

export const ExpenseConceptService = {
  fetchExpensesConcepts,
  addExpenseConcept,
  updateExpenseConcept,
  removeExpenseConcept,
  setConcepts,
};

// -- EXPENSES -- //
// Obtener expenses con caché
export const fetchExpenses = async (): Promise<Expense[]> => {
  console.log("📌 Ejecutando fetchExpenses...");

  // Intentar obtener de IndexedDB primero
  const cachedExpenses = await getFromIndexedDB(COLLECTION_EXPENSES);
  console.log(cachedExpenses);
  if (cachedExpenses && cachedExpenses.length > 0) {
    console.log("📌 Cargando 'expenses' desde IndexedDB...");
    return cachedExpenses as Expense[];
  }

  // Si no hay caché, obtener de Firestore
  console.log("🔥 No hay caché, obteniendo 'expenses' desde Firestore...");
  const querySnapshot = await getDocs(collection(db, COLLECTION_EXPENSES));

  const expenses = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Expense[];

  if (expenses.length > 0) {
    await saveToIndexedDB(COLLECTION_EXPENSES, expenses);
    console.log("✅ 'expenses' sincronizados en IndexedDB.");
  } else {
    console.log("⚠️ No se encontraron 'expenses' en Firestore, no se guardó en IndexedDB.");
  }

  return expenses;
};

// Agregar expense
export const addExpense = async (expense: Expense) => {
  console.log("➕ Agregando expense:", expense);

  const addExpenseRef = doc(db, COLLECTION_EXPENSES, expense.id);
  await setDoc(addExpenseRef, expense);

  // Actualizar IndexedDB
  await saveToIndexedDB(COLLECTION_EXPENSES, [expense]);

  return expense;
};

// Actualizar expense
export const updateExpense = async (expense: Expense) => {
  console.log("📝 Actualizando expense:", expense);

  const docRef = doc(db, COLLECTION_EXPENSES, expense.id);
  await updateDoc(docRef, { ...expense });

  // Actualizar IndexedDB
  await saveToIndexedDB(COLLECTION_EXPENSES, [expense]);

  return expense;
};

// Eliminar expense
export const removeExpense = async (id: string) => {
  console.log("🗑️ Eliminando expense con ID:", id);

  await deleteDoc(doc(db, COLLECTION_EXPENSES, id));

  // Eliminar de IndexedDB
  const indexeddb = await openDatabase();
  const tx = indexeddb.transaction(COLLECTION_EXPENSES, "readwrite");
  const store = tx.objectStore(COLLECTION_EXPENSES);
  store.delete(id);

  return { id };
};

// Agregar múltiples expenses
export const setExpenses = async (expenses: Expense[]) => {
  console.log("📥 Agregando múltiples expenses:", expenses);

  const requests = expenses.map(async (expense) => {
    const docRef = doc(collection(db, COLLECTION_EXPENSES), expense.id);
    await setDoc(docRef, expense);
    return expense;
  });

  // Guardar en IndexedDB
  await saveToIndexedDB(COLLECTION_EXPENSES, expenses);

  return Promise.all(requests);
};

export const ExpenseService = {
  fetchExpenses,
  addExpense,
  updateExpense,
  removeExpense,
  setExpenses,
};

// -- FEES -- //
// Obtener fees con caché
export const fetchFees = async (): Promise<Fee[]> => {
  console.log("📌 Ejecutando fetchFees...");

  // Intentar obtener de IndexedDB primero
  const cachedFees = await getFromIndexedDB(COLLECTION_FEES);
  console.log(cachedFees);
  if (cachedFees && cachedFees.length > 0) {
    console.log("📌 Cargando 'fees' desde IndexedDB...");
    return cachedFees as Fee[];
  }

  // Si no hay caché, obtener de Firestore
  console.log("🔥 No hay caché, obteniendo 'fees' desde Firestore...");
  const querySnapshot = await getDocs(collection(db, COLLECTION_FEES));

  const fees = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Fee[];

  if (fees.length > 0) {
    await saveToIndexedDB(COLLECTION_FEES, fees);
    console.log("✅ 'fees' sincronizados en IndexedDB.");
  } else {
    console.log("⚠️ No se encontraron 'fees' en Firestore, no se guardó en IndexedDB.");
  }

  return fees;
};

// Agregar fee
export const addFee = async (fee: Fee) => {
  console.log("➕ Agregando fee:", fee);

  const addFeeRef = doc(db, COLLECTION_FEES, fee.id);
  await setDoc(addFeeRef, fee);

  // Actualizar IndexedDB
  await saveToIndexedDB(COLLECTION_FEES, [fee]);

  return fee;
};

// Actualizar fee
export const updateFee = async (fee: Fee) => {
  console.log("📝 Actualizando fee:", fee);

  const docRef = doc(db, COLLECTION_FEES, fee.id);
  await updateDoc(docRef, { ...fee });

  // Actualizar IndexedDB
  await saveToIndexedDB(COLLECTION_FEES, [fee]);

  return fee;
};

// Eliminar fee
export const removeFee = async (id: string) => {
  console.log("🗑️ Eliminando fee con ID:", id);

  await deleteDoc(doc(db, COLLECTION_FEES, id));

  // Eliminar de IndexedDB
  const indexeddb = await openDatabase();
  const tx = indexeddb.transaction(COLLECTION_FEES, "readwrite");
  const store = tx.objectStore(COLLECTION_FEES);
  store.delete(id);

  return { id };
};

// Agregar múltiples fees
export const setFees = async (fees: Fee[]) => {
  console.log("📥 Agregando múltiples fees:", fees);

  const requests = fees.map(async (fee) => {
    const docRef = doc(collection(db, COLLECTION_FEES), fee.id);
    await setDoc(docRef, fee);
    return fee;
  });

  // Guardar en IndexedDB
  await saveToIndexedDB(COLLECTION_FEES, fees);

  return Promise.all(requests);
};

export const FeeService = {
  fetchFees,
  addFee,
  updateFee,
  removeFee,
  setFees,
};
