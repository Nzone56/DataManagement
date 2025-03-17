import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { Lawyer } from "../../models/interfaces/Lawyer/ILawyer";
import { db } from "../../server/firebase";
import { COLLECTION_LAWYERS } from "../../server/collections";

const fetchLawyers = async () => {
  const querySnapshot = await getDocs(collection(db, COLLECTION_LAWYERS));
  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Lawyer[];
};

const addLawyer = async (lawyer: Lawyer) => {
  const lawyerRef = doc(db, COLLECTION_LAWYERS, lawyer.id);
  await setDoc(lawyerRef, lawyer);
  return lawyer;
};

const updateLawyer = async (lawyer: Lawyer) => {
  const docRef = doc(db, COLLECTION_LAWYERS, lawyer.id);
  await updateDoc(docRef, { ...lawyer });
  return lawyer;
};

const removeLawyer = async (id: string) => {
  await deleteDoc(doc(db, COLLECTION_LAWYERS, id));
  return { id };
};

export const LawyerService = {
  fetchLawyers,
  addLawyer,
  updateLawyer,
  removeLawyer,
};
