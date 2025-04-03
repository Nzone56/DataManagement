import { ISettings } from "../../models/interfaces/Settings/ISettings";
import { collection, getDocs, updateDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../server/firebase";
import { COLLECTION_SETTINGS } from "../../server/collections";
import { getFromIndexedDB, saveToIndexedDB } from "../indexedDb.service";

// Obtener configuración con caché
export const fetchSettings = async (): Promise<ISettings> => {
  console.log("📌 Ejecutando fetchSettings...");

  // Intentar obtener de IndexedDB primero
  const cachedSettings = await getFromIndexedDB(COLLECTION_SETTINGS);
  if (cachedSettings && cachedSettings.length > 0) {
    console.log("📌 Cargando 'settings' desde IndexedDB...");
    return cachedSettings[0] as ISettings;
  }

  // Si no hay caché, obtener de Firestore
  console.log("🔥 No hay caché, obteniendo 'settings' desde Firestore...");
  const querySnapshot = await getDocs(collection(db, COLLECTION_SETTINGS));

  if (!querySnapshot.empty) {
    const docSnapshot = querySnapshot.docs[0];
    const settings = { id: docSnapshot.id, ...docSnapshot.data() } as ISettings;

    await saveToIndexedDB(COLLECTION_SETTINGS, [settings]);
    console.log("✅ 'settings' sincronizados en IndexedDB.");

    return settings;
  }

  console.log("⚠️ No se encontraron 'settings', usando valores por defecto.");
  return { id: "nubiatorres", theme: "light", dateFormat: "text" };
};

// Agregar configuración
export const addSettings = async (settings: ISettings) => {
  console.log("➕ Agregando settings:", settings);

  const settingsRef = doc(db, COLLECTION_SETTINGS, settings.id);
  await setDoc(settingsRef, settings);

  // Guardar en IndexedDB
  await saveToIndexedDB(COLLECTION_SETTINGS, [settings]);

  return settings;
};

// Actualizar configuración
export const updateSettings = async (settings: ISettings) => {
  console.log("📝 Actualizando settings:", settings);

  const settingsRef = doc(db, COLLECTION_SETTINGS, settings.id);
  await updateDoc(settingsRef, { ...settings });

  // Actualizar IndexedDB
  await saveToIndexedDB(COLLECTION_SETTINGS, [settings]);

  return settings;
};

export const SettingsService = {
  addSettings,
  fetchSettings,
  updateSettings,
};
