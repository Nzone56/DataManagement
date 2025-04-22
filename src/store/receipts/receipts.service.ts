import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../../server/firebase";
import { COLLECTION_RECEIPTS } from "../../server/collections";
import type { Receipt } from "../../models/interfaces/Receipt/IReceipts";
import { getFromIndexedDB, openDatabase, saveToIndexedDB } from "../indexedDb.service";

// Obtener receipts con caché
export const fetchReceipts = async (): Promise<Receipt[]> => {
  console.log("📌 Ejecutando fetchReceipts...");

  // Intentar obtener de IndexedDB primero
  const cachedReceipts = await getFromIndexedDB(COLLECTION_RECEIPTS);
  if (cachedReceipts && cachedReceipts.length > 0) {
    console.log("📌 Cargando 'receipts' desde IndexedDB...");
    return cachedReceipts as Receipt[];
  }

  // Si no hay caché, obtener de Firestore
  console.log("🔥 No hay caché, obteniendo 'receipts' desde Firestore...");
  const querySnapshot = await getDocs(collection(db, COLLECTION_RECEIPTS));

  const receipts = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Receipt[];

  if (receipts.length > 0) {
    await saveToIndexedDB(COLLECTION_RECEIPTS, receipts);
    console.log("✅ 'receipts' sincronizados en IndexedDB.");
  } else {
    console.log("⚠️ No se encontraron 'receipts' en Firestore.");
  }

  return receipts;
};

// Agregar receipt
export const addReceipt = async (receipt: Receipt) => {
  console.log("➕ Agregando receipt:", receipt);

  const receiptRef = doc(db, COLLECTION_RECEIPTS, receipt.id);
  await setDoc(receiptRef, receipt);

  // Actualizar IndexedDB
  await saveToIndexedDB(COLLECTION_RECEIPTS, [receipt]);

  return receipt;
};

// Actualizar receipt
export const updateReceipt = async (receipt: Receipt): Promise<Receipt> => {
  if (!receipt.id) {
    throw new Error("Receipt document ID is missing");
  }

  console.log("📝 Actualizando receipt:", receipt);

  const receiptRef = doc(db, COLLECTION_RECEIPTS, receipt.id);
  const { id, ...receiptData } = receipt; // Remover el ID para evitar conflictos
  await updateDoc(receiptRef, receiptData);

  // Actualizar IndexedDB
  await saveToIndexedDB(COLLECTION_RECEIPTS, [receipt]);

  return receipt;
};

// Eliminar receipt
export const removeReceipt = async (id: string) => {
  console.log("🗑️ Eliminando receipt con ID:", id);

  await deleteDoc(doc(db, COLLECTION_RECEIPTS, id));

  // Eliminar de IndexedDB
  const indexeddb = await openDatabase();
  const tx = indexeddb.transaction(COLLECTION_RECEIPTS, "readwrite");
  const store = tx.objectStore(COLLECTION_RECEIPTS);
  store.delete(id);

  return { id };
};

// Agregar múltiples receipts sin ID
export const setReceipts = async (receipts: Omit<Receipt, "id">[]) => {
  console.log("📥 Agregando múltiples receipts:", receipts);

  const requests = receipts.map(async (receipt) => {
    const docRef = await addDoc(collection(db, COLLECTION_RECEIPTS), receipt);
    const newReceipt = { id: docRef.id, ...receipt };

    // Guardar en IndexedDB
    await saveToIndexedDB(COLLECTION_RECEIPTS, [newReceipt]);

    return newReceipt;
  });

  return Promise.all(requests);
};

export const ReceiptService = {
  fetchReceipts,
  addReceipt,
  updateReceipt,
  removeReceipt,
  setReceipts,
};
