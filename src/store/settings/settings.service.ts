import { ISettings } from "../../models/interfaces/Settings/ISettings";
import { collection, getDocs, updateDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../server/firebase";
import { COLLECTION_SETTINGS } from "../../server/collections";

const fetchSettings = async (): Promise<ISettings> => {
  const querySnapshot = await getDocs(collection(db, COLLECTION_SETTINGS));

  if (!querySnapshot.empty) {
    const docSnapshot = querySnapshot.docs[0];
    return { id: docSnapshot.id, ...docSnapshot.data() } as ISettings;
  }

  return { id: "nubiatorres", theme: "light", dateFormat: "text" };
};

const addSettings = async (settings: ISettings) => {
  const lawyerRef = doc(db, COLLECTION_SETTINGS, settings.id);
  await setDoc(lawyerRef, settings);
  return settings;
};

const updateSettings = async (settings: ISettings) => {
  const settingsRef = doc(db, COLLECTION_SETTINGS, settings.id);

  await updateDoc(settingsRef, { ...settings });
  return settings || { id: "nubiatorres", theme: "light", dateFormat: "text" };
};

export const SettingsService = {
  addSettings,
  fetchSettings,
  updateSettings,
};
