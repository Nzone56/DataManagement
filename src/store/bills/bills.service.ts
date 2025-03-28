import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../../server/firebase";
import { COLLECTION_BILLS } from "../../server/collections";
import { Bill } from "../../models/interfaces/Bill/IBill";

const fetchBills = async (): Promise<Bill[]> => {
  const querySnapshot = await getDocs(collection(db, COLLECTION_BILLS));
  return querySnapshot.docs.map((docSnapshot) => ({ id: docSnapshot.id, ...docSnapshot.data() } as Bill));
};

const addBill = async (bill: Bill) => {
  const billRef = doc(db, COLLECTION_BILLS, bill.id);
  await setDoc(billRef, bill);
  return bill;
};

const updateBill = async (bill: Bill): Promise<Bill> => {
  if (!bill.id) {
    throw new Error("Bill document ID is missing");
  }
  const billRef = doc(db, COLLECTION_BILLS, bill.id);
  const { id, ...billData } = bill;
  await updateDoc(billRef, billData);
  return bill;
};

const removeBill = async (id: string) => {
  await deleteDoc(doc(db, COLLECTION_BILLS, id));
  return id;
};

const setBills = async (bills: Omit<Bill, "id">[]) => {
  const requests = bills.map(async (bill) => {
    const docRef = await addDoc(collection(db, COLLECTION_BILLS), bill);
    return { id: docRef.id, ...bill };
  });
  return Promise.all(requests);
};

export const BillService = {
  fetchBills,
  addBill,
  updateBill,
  removeBill,
  setBills,
};
