import { Worklog } from "../../models/interfaces/TimeManager/IWorklog";
import { collection, getDocs, doc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../../server/firebase";
import { COLLECTION_WORKLOGS } from "../../server/collections";

const fetchWorklogs = async (): Promise<Worklog[]> => {
  const querySnapshot = await getDocs(collection(db, COLLECTION_WORKLOGS));
  return querySnapshot.docs.map((docSnapshot) => ({ id: docSnapshot.id, ...docSnapshot.data() } as Worklog));
};

const addWorklog = async (worklog: Worklog) => {
  const worklogRef = doc(db, COLLECTION_WORKLOGS, worklog.id);
  await setDoc(worklogRef, worklog);
  return worklog;
};

const updateWorklog = async (worklog: Worklog): Promise<Worklog> => {
  if (!worklog.id) {
    throw new Error("Worklog document ID is missing");
  }
  const worklogRef = doc(db, COLLECTION_WORKLOGS, worklog.id);
  const { id, ...worklogData } = worklog; // Remover el id para evitar conflictos
  await updateDoc(worklogRef, worklogData);
  return worklog;
};

const removeWorklog = async (id: string) => {
  await deleteDoc(doc(db, COLLECTION_WORKLOGS, id));
  return id;
};

const setWorklogs = async (worklogs: Worklog[]) => {
  const requests = worklogs.map(async (worklog) => {
    const docRef = doc(collection(db, COLLECTION_WORKLOGS), worklog.id);
    await setDoc(docRef, worklog);
    return worklog;
  });

  return Promise.all(requests);
};

export const WorklogService = {
  fetchWorklogs,
  addWorklog,
  updateWorklog,
  removeWorklog,
  setWorklogs,
};
