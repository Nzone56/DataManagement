import { MainLayout } from "../../layouts/MainLayout";
import { ListLayout } from "../../layouts/ListLayout";
import { useDispatch, useSelector } from "react-redux";
import { getClients } from "../../../store/clients/clients.selector";
import {
  addClient,
  fetchClients,
  removeClient,
  setClients,
  updateClient,
} from "../../../store/clients/clients.actions";
import { useEffect } from "react";
import { AppDispatch } from "../../../store/store";
import { Client } from "../../../models/interfaces/Client/IClient";
import { toZonedTime } from "date-fns-tz";
import { useTransformData } from "../../../hooks/useTransformData";

const InitialClient: Client = {
  id: "",
  name: "",
  phone: "",
  repLegal: "",
  nitcc: "",
  address: "",
  city: "",
  email: "",
  joinedDate: toZonedTime(new Date(), "America/Bogota").getTime(),
};

export const ClientsPage = () => {
  const { clients, loading } = useSelector(getClients);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchClients());
    //eslint-disable-next-line
  }, []);

  const { mapHeadersToClient } = useTransformData();

  return (
    <MainLayout>
      <ListLayout
        title="Clientes"
        list={clients}
        initialDataItem={InitialClient}
        header={Object.keys(InitialClient)?.filter((headItem) => headItem !== "id")}
        addItem={addClient}
        updateItem={updateClient}
        removeItem={removeClient}
        loading={loading}
        mapUpload={mapHeadersToClient}
        setData={setClients}
      />
    </MainLayout>
  );
};
