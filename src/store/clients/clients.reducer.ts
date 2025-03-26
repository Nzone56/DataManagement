import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { addClient, fetchClients, removeClient, updateClient, setClients } from "./clients.actions";
import { Client } from "../../models/interfaces/Client/IClient";
import { toast } from "react-toastify";

interface ClientsReducer {
  clients: Client[];
  loading: boolean;
  error: string | null;
}

const initialState: ClientsReducer = {
  clients: [],
  loading: false,
  error: null,
};

export const clientsReducer = createReducer(initialState, (builder) => {
  builder
    // Fetch Clients
    .addCase(fetchClients.pending, (state) => ({
      ...state,
      loading: true,
      error: null,
    }))
    .addCase(fetchClients.fulfilled, (state, action: PayloadAction<Client[]>) => ({
      ...state,
      loading: false,
      clients: action.payload,
    }))
    .addCase(fetchClients.rejected, (state, action) => {
      toast.error("Error al obtener los clientes");
      return {
        ...state,
        loading: false,
        error: action.error.message || "Error al obtener los clientes",
      };
    })

    // Add client
    .addCase(addClient.pending, (state) => {
      state.loading = true;
    })
    .addCase(addClient.fulfilled, (state, action: PayloadAction<Client>) => {
      state.loading = false;
      state.clients.push(action.payload);
      toast.success("Cliente añadido con éxito");
    })
    .addCase(addClient.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error al añadir cliente";
      toast.error(state.error);
    })

    // Delete client
    .addCase(removeClient.pending, (state) => {
      state.loading = true;
    })
    .addCase(removeClient.fulfilled, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.clients = state.clients.filter((client) => client.id !== action.payload);
      toast.success("Cliente eliminado con éxito");
    })
    .addCase(removeClient.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error al eliminar cliente";
      toast.error(state.error);
    })

    // Update client
    .addCase(updateClient.pending, (state) => {
      state.loading = true;
    })
    .addCase(updateClient.fulfilled, (state, action: PayloadAction<Client>) => {
      state.loading = false;
      const index = state.clients.findIndex((client) => client.id === action.payload.id);
      if (index !== -1) {
        state.clients[index] = action.payload;
        toast.success("Cliente actualizado con éxito");
      }
    })
    .addCase(updateClient.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error al actualizar cliente";
      toast.error(state.error);
    })

    // Set Worklog
    .addCase(setClients.pending, (state) => {
      state.loading = true;
    })
    .addCase(setClients.fulfilled, (state, action: PayloadAction<Client[]>) => {
      state.loading = false;
      state.clients = [...state.clients, ...Object.values(action.payload)];
      toast.success("Clientes añadidos con éxito");
    })
    .addCase(setClients.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error al subir los clientes";
      toast.error(state.error);
    });
});
