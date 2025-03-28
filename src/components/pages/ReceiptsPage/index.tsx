import { MainLayout } from "../../layouts/MainLayout";
import { ListLayout } from "../../layouts/ListLayout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { useEffect } from "react";
import {
  addReceipt,
  fetchReceipts,
  removeReceipt,
  setReceipts,
  updateReceipt,
} from "../../../store/receipts/receipts.actions";
import { fetchClients } from "../../../store/clients/clients.actions";
import { getReceipts } from "../../../store/receipts/receipts.selector";
import { Receipt } from "../../../models/interfaces/Receipt/IReceipts";
import { useTransformData } from "../../../hooks/useTransformData";

const InitialReceipt: Receipt = {
  id: "",
  receiptNumber: "",
  date: 0,
  clientId: "",
  registered: "",
  totalValue: 0,
  paymentMethod: "",
  bills: "",
  observations: "",
};

export const ReceiptsPage = () => {
  const { receipts, loading } = useSelector(getReceipts);
  const dispatch = useDispatch<AppDispatch>();

  const { mapHeadersToReceipt } = useTransformData();

  useEffect(() => {
    dispatch(fetchReceipts());
    dispatch(fetchClients());
    //eslint-disable-next-line
  }, []);

  return (
    <MainLayout>
      <ListLayout
        title="Ingresos"
        list={receipts}
        initialDataItem={InitialReceipt}
        header={Object.keys(InitialReceipt)?.filter((headItem) => headItem !== "id")}
        addItem={addReceipt}
        updateItem={updateReceipt}
        removeItem={removeReceipt}
        loading={loading}
        mapUpload={mapHeadersToReceipt}
        setData={setReceipts}
      />
    </MainLayout>
  );
};
