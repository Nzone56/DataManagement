import { MainLayout } from "../../layouts/MainLayout";
import { TableLayout } from "../../layouts/TableLayout";
import { ClientList, ClientWorkLogs } from "./PlaceholderData";

export const ClientsPage = () => {
  return (
    <MainLayout>
      <TableLayout
        title="Clientes"
        list={ClientList}
        data={ClientWorkLogs}
        header={Object.keys(ClientList[0])}
      />
    </MainLayout>
  );
};
