import { MainLayout } from "../../layouts/MainLayout";
import { ListLayout } from "../../layouts/ListLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFees } from "../../../store/expenses/expenses.selector";
import { addFee, fetchFees, removeFee, updateFee } from "../../../store/expenses/expenses.actions";
import { AppDispatch } from "../../../store/store";
import { Fee } from "../../../models/interfaces/Expense/IExpense";
import { toZonedTime } from "date-fns-tz";

const InitialFee: Fee = {
  id: "",
  feeConcept: "Carlos Bermúdez",
  amount: 0,
  date: toZonedTime(new Date(), "America/Bogota").getTime(),
  description: "",
};

export const FeesPage = () => {
  const { fees, loading } = useSelector(getFees);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchFees());
    //eslint-disable-next-line
  }, []);

  return (
    <MainLayout>
      <ListLayout
        title="Honorarios"
        list={fees}
        initialDataItem={InitialFee}
        header={Object.keys(InitialFee)?.filter((headItem) => headItem !== "id")}
        addItem={addFee}
        updateItem={updateFee}
        removeItem={removeFee}
        loading={loading}
      />
    </MainLayout>
  );
};
