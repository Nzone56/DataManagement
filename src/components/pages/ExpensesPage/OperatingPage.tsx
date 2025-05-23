import { MainLayout } from "../../layouts/MainLayout";
import { ListLayout } from "../../layouts/ListLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import type { Expense } from "../../../models/interfaces/Expense/IExpense";
import { getExpenses } from "../../../store/expenses/expenses.selector";
import {
  addExpense,
  fetchExpenseConcepts,
  fetchExpenses,
  removeExpense,
  setExpenses,
  updateExpense,
} from "../../../store/expenses/expenses.actions";
import { AppDispatch } from "../../../store/store";
import { toZonedTime } from "date-fns-tz";
import { useTransformData } from "../../../hooks/useTransformData";

const InitialExpense: Expense = {
  id: "",
  conceptId: "",
  categoryId: "",
  amount: 0,
  date: toZonedTime(new Date(), "America/Bogota").getTime(),
  description: "",
};

export const OperatingPage = () => {
  const { expenses, loading } = useSelector(getExpenses);
  const dispatch = useDispatch<AppDispatch>();

  const { mapHeadersToExpense } = useTransformData();

  useEffect(() => {
    dispatch(fetchExpenses());
    dispatch(fetchExpenseConcepts());
    //eslint-disable-next-line
  }, []);

  return (
    <MainLayout>
      <ListLayout
        title="Gastos"
        list={expenses}
        initialDataItem={InitialExpense}
        header={Object.keys(InitialExpense)?.filter((headItem) => headItem !== "id")}
        addItem={addExpense}
        updateItem={updateExpense}
        removeItem={removeExpense}
        loading={loading}
        mapUpload={mapHeadersToExpense}
        setData={setExpenses}
      />
    </MainLayout>
  );
};
