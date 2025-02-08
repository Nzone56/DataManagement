import { createAsyncThunk } from "@reduxjs/toolkit";
import { Client } from "../../models/interfaces/Client/IClient";
import { ClientService } from "./clients.service";
import { ThunkApiConfig } from "../store";

export const addClient = createAsyncThunk<Client, Client, ThunkApiConfig>("clients/addClient", (client: Client) =>
  ClientService.addClient(client)
);
export const removeClient = createAsyncThunk<string, string, ThunkApiConfig>(
  "clients/removeClient",
  (clientId: string) => ClientService.removeClient(clientId)
);
export const updateClient = createAsyncThunk<Client, Client, ThunkApiConfig>("clients/updateClient", (client: Client) =>
  ClientService.updateClient(client)
);
export const fetchClients = createAsyncThunk<Client[]>("clients/fetchClients", () => ClientService.fetchClients());
