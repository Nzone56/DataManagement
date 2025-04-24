import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import type { Lawyer } from "../../models/interfaces/Lawyer/ILawyer";
import { db } from "../../server/firebase";
import { COLLECTION_LAWYERS } from "../../server/collections";
import { getFromIndexedDB, openDatabase, saveToIndexedDB } from "../indexedDb.service";

export const fetchLawyers = async (): Promise<Lawyer[]> => {
  console.log("📌 Ejecutando fetchLawyers...");

  const cachedLawyers = await getFromIndexedDB("lawyers");
  console.log("Se cargaron ", cachedLawyers.length, "abogados");
  if (cachedLawyers && cachedLawyers.length > 0) {
    console.log("📌 Cargando 'lawyers' desde IndexedDB...");
    return cachedLawyers as Lawyer[];
  }

  console.log("🔥 No hay caché, obteniendo 'lawyers' desde Firestore...");
  const querySnapshot = await getDocs(collection(db, COLLECTION_LAWYERS));

  const lawyers = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Lawyer[];

  if (lawyers.length > 0) {
    await saveToIndexedDB("lawyers", lawyers);
    console.log("✅ 'Lawyers' sincronizados en IndexedDB.");
  } else {
    console.log("⚠️ No se encontraron 'lawyers' en Firestore, no se guardó en IndexedDB.");
  }

  return lawyers;
};

const addLawyer = async (lawyer: Lawyer) => {
  const lawyerRef = doc(db, COLLECTION_LAWYERS, lawyer.id);
  await setDoc(lawyerRef, lawyer);

  // Actualizar IndexedDB
  await saveToIndexedDB(COLLECTION_LAWYERS, [lawyer]);

  return lawyer;
};

const updateLawyer = async (lawyer: Lawyer) => {
  const docRef = doc(db, COLLECTION_LAWYERS, lawyer.id);
  await updateDoc(docRef, { ...lawyer });

  // Actualizar IndexedDB
  await saveToIndexedDB(COLLECTION_LAWYERS, [lawyer]);

  return lawyer;
};

const removeLawyer = async (id: string) => {
  await deleteDoc(doc(db, COLLECTION_LAWYERS, id));

  // Eliminar de IndexedDB
  const indexeddb = await openDatabase();
  const tx = indexeddb.transaction(COLLECTION_LAWYERS, "readwrite");
  const store = tx.objectStore(COLLECTION_LAWYERS);
  store.delete(id);

  return { id };
};

export const LawyerService = {
  fetchLawyers,
  addLawyer,
  updateLawyer,
  removeLawyer,
};
