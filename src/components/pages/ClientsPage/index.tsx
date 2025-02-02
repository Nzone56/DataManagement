import { MainLayout } from "../../layouts/MainLayout";
import { ListLayout } from "../../layouts/ListLayout";
import { ClientList, ClientWorkLogs } from "./PlaceholderData";

export const ClientsPage = () => {
  return (
    <MainLayout>
      <ListLayout
        title="Clientes"
        list={ClientList}
        data={ClientWorkLogs}
        header={Object.keys(ClientList[0])}
      />
    </MainLayout>
  );
};
