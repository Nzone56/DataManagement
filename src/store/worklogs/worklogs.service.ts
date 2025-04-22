import type { Worklog } from "../../models/interfaces/TimeManager/IWorklog";
import { collection, getDocs, doc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../../server/firebase";
import { COLLECTION_WORKLOGS } from "../../server/collections";
import { getFromIndexedDB, openDatabase, saveToIndexedDB } from "../indexedDb.service";

// Obtener worklogs con caché
export const fetchWorklogs = async (): Promise<Worklog[]> => {
  console.log("📌 Ejecutando fetchWorklogs...");

  // Intentar obtener de IndexedDB primero
  const cachedWorklogs = await getFromIndexedDB(COLLECTION_WORKLOGS);
  console.log(cachedWorklogs);
  if (cachedWorklogs && cachedWorklogs.length > 0) {
    console.log("📌 Cargando 'worklogs' desde IndexedDB...");
    return cachedWorklogs as Worklog[];
  }

  // Si no hay caché, obtener de Firestore
  console.log("🔥 No hay caché, obteniendo 'worklogs' desde Firestore...");
  const querySnapshot = await getDocs(collection(db, COLLECTION_WORKLOGS));

  const worklogs = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Worklog[];

  if (worklogs.length > 0) {
    await saveToIndexedDB(COLLECTION_WORKLOGS, worklogs);
    console.log("✅ 'worklogs' sincronizados en IndexedDB.");
  } else {
    console.log("⚠️ No se encontraron 'worklogs' en Firestore, no se guardó en IndexedDB.");
  }

  return worklogs;
};

// Agregar worklog
export const addWorklog = async (worklog: Worklog) => {
  console.log("➕ Agregando worklog:", worklog);

  const worklogRef = doc(db, COLLECTION_WORKLOGS, worklog.id);
  await setDoc(worklogRef, worklog);

  // Actualizar IndexedDB
  await saveToIndexedDB(COLLECTION_WORKLOGS, [worklog]);

  return worklog;
};

// Actualizar worklog
export const updateWorklog = async (worklog: Worklog): Promise<Worklog> => {
  if (!worklog.id) {
    throw new Error("Worklog document ID is missing");
  }

  console.log("📝 Actualizando worklog:", worklog);

  const worklogRef = doc(db, COLLECTION_WORKLOGS, worklog.id);
  const { id, ...worklogData } = worklog; // Remover el ID para evitar conflictos
  await updateDoc(worklogRef, worklogData);

  // Actualizar IndexedDB
  await saveToIndexedDB(COLLECTION_WORKLOGS, [worklog]);

  return worklog;
};

// Eliminar worklog
export const removeWorklog = async (id: string) => {
  console.log("🗑️ Eliminando worklog con ID:", id);

  await deleteDoc(doc(db, COLLECTION_WORKLOGS, id));

  // Eliminar de IndexedDB
  const indexeddb = await openDatabase();
  const tx = indexeddb.transaction(COLLECTION_WORKLOGS, "readwrite");
  const store = tx.objectStore(COLLECTION_WORKLOGS);
  store.delete(id);

  return { id };
};

// Agregar múltiples worklogs
export const setWorklogs = async (worklogs: Worklog[]) => {
  console.log("📥 Agregando múltiples worklogs:", worklogs);

  const requests = worklogs.map(async (worklog) => {
    const docRef = doc(collection(db, COLLECTION_WORKLOGS), worklog.id);
    await setDoc(docRef, worklog);
    return worklog;
  });

  // Guardar en IndexedDB
  await saveToIndexedDB(COLLECTION_WORKLOGS, worklogs);

  return Promise.all(requests);
};

export const WorklogService = {
  fetchWorklogs,
  addWorklog,
  updateWorklog,
  removeWorklog,
  setWorklogs,
};
