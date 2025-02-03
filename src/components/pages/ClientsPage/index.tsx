import { MainLayout } from "../../layouts/MainLayout";
import { ListLayout } from "../../layouts/ListLayout";
import { ClientList, ClientWorkLogs, InitialClient } from "./PlaceholderData";

export const ClientsPage = () => {
  return (
    <MainLayout>
      <ListLayout
        title="Clientes"
        list={ClientList}
        initialDataItem={InitialClient}
        data={ClientWorkLogs}
        header={Object.keys(ClientList[0]).filter(
          (headItem) => headItem !== "id"
        )}
      />
    </MainLayout>
  );
};
