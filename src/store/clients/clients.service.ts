import { Client } from "../../models/interfaces/Client/IClient";
import { collection, getDocs, doc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../../server/firebase";
import { COLLECTION_CLIENTS } from "../../server/collections";

// Obtener todos los clientes
const fetchClients = async (): Promise<Client[]> => {
  const querySnapshot = await getDocs(collection(db, COLLECTION_CLIENTS));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Client));
};

const addClient = async (client: Client) => {
  const clientRef = doc(db, COLLECTION_CLIENTS, client.id);
  await setDoc(clientRef, client);
  return client;
};

const updateClient = async (client: Client): Promise<Client> => {
  const { id, ...clientData } = client;
  const clientRef = doc(db, COLLECTION_CLIENTS, id);
  console.log(clientRef);
  await updateDoc(clientRef, clientData as Partial<Client>);

  return client;
};

// Eliminar un cliente
const removeClient = async (id: string): Promise<void> => {
  const clientRef = doc(db, COLLECTION_CLIENTS, id);
  await deleteDoc(clientRef);
};

export const ClientService = {
  fetchClients,
  addClient,
  updateClient,
  removeClient,
};
