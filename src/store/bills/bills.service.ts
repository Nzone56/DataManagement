import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../../server/firebase";
import { COLLECTION_BILLS } from "../../server/collections";
import type { Bill } from "../../models/interfaces/Bill/IBill";
import { getFromIndexedDB, openDatabase, saveToIndexedDB } from "../indexedDb.service";

export const fetchBills = async (): Promise<Bill[]> => {
  console.log("📌 Ejecutando fetchBills...");

  // Intentar obtener de IndexedDB primero
  const cachedBills = await getFromIndexedDB(COLLECTION_BILLS);
  console.log(cachedBills);
  if (cachedBills && cachedBills.length > 0) {
    console.log("📌 Cargando 'bills' desde IndexedDB...");
    return cachedBills as Bill[];
  }

  // Si no hay caché, obtener de Firestore
  console.log("🔥 No hay caché, obteniendo 'bills' desde Firestore...");
  const querySnapshot = await getDocs(collection(db, COLLECTION_BILLS));

  const bills = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Bill[];

  if (bills.length > 0) {
    await saveToIndexedDB(COLLECTION_BILLS, bills);
    console.log("✅ 'bills' sincronizados en IndexedDB.");
  } else {
    console.log("⚠️ No se encontraron 'bills' en Firestore, no se guardó en IndexedDB.");
  }

  return bills;
};

const addBill = async (bill: Bill) => {
  const billRef = doc(db, COLLECTION_BILLS, bill.id);
  await setDoc(billRef, bill);

  // Guardar en IndexedDB
  await saveToIndexedDB(COLLECTION_BILLS, [bill]);

  return bill;
};

const updateBill = async (bill: Bill): Promise<Bill> => {
  if (!bill.id) {
    throw new Error("Bill document ID is missing");
  }

  const billRef = doc(db, COLLECTION_BILLS, bill.id);
  const { id, ...billData } = bill;
  await updateDoc(billRef, billData);

  // También actualizar en IndexedDB
  await saveToIndexedDB(COLLECTION_BILLS, [bill]);

  return bill;
};

const removeBill = async (id: string) => {
  await deleteDoc(doc(db, COLLECTION_BILLS, id));

  // También eliminar de IndexedDB
  const indexedDB = await openDatabase();
  const tx = indexedDB.transaction(COLLECTION_BILLS, "readwrite");
  const store = tx.objectStore(COLLECTION_BILLS);
  store.delete(id);

  return id;
};

const setBills = async (bills: Omit<Bill, "id">[]) => {
  const requests = bills.map(async (bill) => {
    const docRef = await addDoc(collection(db, COLLECTION_BILLS), bill);
    return { id: docRef.id, ...bill };
  });

  const savedBills = await Promise.all(requests);

  // Guardar en IndexedDB
  await saveToIndexedDB(COLLECTION_BILLS, savedBills);

  return savedBills;
};

export const BillService = {
  fetchBills,
  addBill,
  updateBill,
  removeBill,
  setBills,
};
