import { Client } from "../../models/interfaces/Client/IClient";

// Base URL de json-server
const API_URL = "http://localhost:3000/clients";

const fetchClients = async () => {
  const response = await fetch(API_URL);
  return (await response.json()) as Client[];
};

const addClient = async (client: Client) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(client),
  });

  return await response.json();
};

const updateClient = async (client: Client) => {
  const response = await fetch(`http://localhost:3000/clients/${client.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(client),
  });

  return await response.json();
};

const removeClient = async (id: string) => {
  const response = await fetch(`http://localhost:3000/clients/${id}`, { method: "DELETE" });
  return await response.json();
};

export const ClientService = {
  fetchClients,
  addClient,
  updateClient,
  removeClient,
};
