import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../../server/firebase";
import { COLLECTION_RECEIPTS } from "../../server/collections";
import { Receipt } from "../../models/interfaces/Receipt/IReceipts";

const fetchReceipts = async (): Promise<Receipt[]> => {
  const querySnapshot = await getDocs(collection(db, COLLECTION_RECEIPTS));
  return querySnapshot.docs.map((docSnapshot) => ({ id: docSnapshot.id, ...docSnapshot.data() } as Receipt));
};

const addReceipt = async (receipt: Receipt) => {
  const receiptRef = doc(db, COLLECTION_RECEIPTS, receipt.id);
  await setDoc(receiptRef, receipt);
  return receipt;
};

const updateReceipt = async (receipt: Receipt): Promise<Receipt> => {
  if (!receipt.id) {
    throw new Error("Receipt document ID is missing");
  }
  const receiptRef = doc(db, COLLECTION_RECEIPTS, receipt.id);
  const { id, ...receiptData } = receipt;
  await updateDoc(receiptRef, receiptData);
  return receipt;
};

const removeReceipt = async (id: string) => {
  await deleteDoc(doc(db, COLLECTION_RECEIPTS, id));
  return id;
};

const setReceipts = async (receipts: Omit<Receipt, "id">[]) => {
  const requests = receipts.map(async (receipt) => {
    const docRef = await addDoc(collection(db, COLLECTION_RECEIPTS), receipt);
    return { id: docRef.id, ...receipt };
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
