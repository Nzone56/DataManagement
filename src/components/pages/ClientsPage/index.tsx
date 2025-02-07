import { MainLayout } from "../../layouts/MainLayout";
import { ListLayout } from "../../layouts/ListLayout";
import { ClientWorkLogs, InitialClient } from "./PlaceholderData";
import { useDispatch, useSelector } from "react-redux";
import { getClients } from "../../../store/clients/clients.selector";
import {
  addClient,
  fetchClients,
  removeClient,
  updateClient,
} from "../../../store/clients/clients.actions";
import { useEffect } from "react";
import { AppDispatch } from "../../../store/store";

export const ClientsPage = () => {
  const { clients, loading } = useSelector(getClients);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchClients());
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {loading || clients.length === 0 ? (
        <span> CARGANDO... </span>
      ) : (
        <MainLayout>
          <ListLayout
            title="Clientes"
            list={clients}
            initialDataItem={InitialClient}
            data={ClientWorkLogs}
            header={Object.keys(clients[0])?.filter(
              (headItem) => headItem !== "id"
            )}
            addItem={addClient}
            updateItem={updateClient}
            removeItem={removeClient}
            loading={loading}
          />
        </MainLayout>
      )}
    </>
  );
};
