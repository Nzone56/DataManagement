import { createAsyncThunk } from "@reduxjs/toolkit";
import { Client } from "../../models/interfaces/Client/IClient";
import { ClientService } from "./clients.service";

export const addClient = createAsyncThunk<Client, Client>("clients/addClient", (client: Client) =>
  ClientService.addClient(client)
);
export const removeClient = createAsyncThunk<string, string>("clients/removeClient", (clientId: string) =>
  ClientService.removeClient(clientId)
);
export const updateClient = createAsyncThunk<Client, Client>("clients/updateClient", (client: Client) =>
  ClientService.updateClient(client)
);
export const fetchClients = createAsyncThunk<Client[]>("clients/fetchClients", () => ClientService.fetchClients());
