import type { Client } from "../../models/interfaces/Client/IClient";
import { collection, getDocs, doc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../../server/firebase";
import { COLLECTION_CLIENTS } from "../../server/collections";
import { getFromIndexedDB, openDatabase, saveToIndexedDB } from "../indexedDb.service";

export const fetchClients = async (): Promise<Client[]> => {
  console.log("📌 Ejecutando fetchClients...");

  const cachedClients = await getFromIndexedDB("clients");
  console.log(cachedClients);
  if (cachedClients && cachedClients.length > 0) {
    console.log("📌 Cargando 'clients' desde IndexedDB...");
    return cachedClients as Client[];
  }

  console.log("🔥 No hay caché, obteniendo 'clients' desde Firestore...");
  const querySnapshot = await getDocs(collection(db, COLLECTION_CLIENTS));

  const clients = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Client[];

  if (clients.length > 0) {
    await saveToIndexedDB("clients", clients);
    console.log("✅ 'clients' sincronizados en IndexedDB.");
  } else {
    console.log("⚠️ No se encontraron 'clients' en Firestore, no se guardó en IndexedDB.");
  }

  return clients;
};

const addClient = async (client: Client) => {
  const clientRef = doc(db, COLLECTION_CLIENTS, client.id);
  await setDoc(clientRef, client);
  // Actualizar IndexedDB
  await saveToIndexedDB(COLLECTION_CLIENTS, [client]);
  return client;
};

const updateClient = async (client: Client): Promise<Client> => {
  const { id, ...clientData } = client;
  const clientRef = doc(db, COLLECTION_CLIENTS, id);
  await updateDoc(clientRef, clientData as Partial<Client>);

  // Actualizar IndexedDB
  await saveToIndexedDB(COLLECTION_CLIENTS, [client]);

  return client;
};

const removeClient = async (id: string): Promise<void> => {
  const clientRef = doc(db, COLLECTION_CLIENTS, id);
  await deleteDoc(clientRef);

  // Actualizar IndexedDB
  const indexeddb = await openDatabase();
  const tx = indexeddb.transaction(COLLECTION_CLIENTS, "readwrite");
  const store = tx.objectStore(COLLECTION_CLIENTS);
  store.delete(id);
};

const setClients = async (clients: Client[]) => {
  const requests = clients.map(async (client) => {
    const docRef = doc(collection(db, COLLECTION_CLIENTS), client.id);
    await setDoc(docRef, client);
    return client;
  });

  // Actualizar IndexedDB
  await saveToIndexedDB(COLLECTION_CLIENTS, clients);

  return Promise.all(requests);
};

export const ClientService = {
  fetchClients,
  addClient,
  updateClient,
  removeClient,
  setClients,
};
