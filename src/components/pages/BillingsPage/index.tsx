import { MainLayout } from "../../layouts/MainLayout";
import { ListLayout } from "../../layouts/ListLayout";
import { Bill } from "../../../models/interfaces/Bill/IBill";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { useEffect } from "react";
import { addBill, fetchBills, removeBill, setBills, updateBill } from "../../../store/bills/bills.actions";
import { fetchClients } from "../../../store/clients/clients.actions";
import { getBills } from "../../../store/bills/bills.selector";
import { useTransformData } from "../../../hooks/useTransformData";

const InitialBill: Bill = {
  id: "",
  billNumber: "",
  issueDate: 0,
  expirationDate: 0,
  clientId: "",
  nitcc: "",
  value: 0,
  totalValue: 0,
  concept: "",
  subject: "",
  status: "",
  city: "",
};

export const BillingsPage = () => {
  const { bills, loading } = useSelector(getBills);
  const dispatch = useDispatch<AppDispatch>();

  const { mapHeadersToBill } = useTransformData();

  useEffect(() => {
    dispatch(fetchBills());
    dispatch(fetchClients());
    //eslint-disable-next-line
  }, []);

  return (
    <MainLayout>
      <ListLayout
        title="Facturación"
        list={bills}
        initialDataItem={InitialBill}
        header={Object.keys(InitialBill)?.filter((headItem) => headItem !== "id")}
        addItem={addBill}
        updateItem={updateBill}
        removeItem={removeBill}
        loading={loading}
        mapUpload={mapHeadersToBill}
        setData={setBills}
      />
    </MainLayout>
  );
};
