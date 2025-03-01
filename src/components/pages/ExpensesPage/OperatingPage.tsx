import { MainLayout } from "../../layouts/MainLayout";
import { ListLayout } from "../../layouts/ListLayout";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";

import { Expense } from "../../../models/interfaces/Expense/IExpense";
import { getExpenses } from "../../../store/expenses/expenses.selector";
import {
  addExpense,
  fetchExpenseConcepts,
  fetchExpenses,
  removeExpense,
  updateExpense,
} from "../../../store/expenses/expenses.actions";
import { AppDispatch } from "../../../store/store";
import { Typography } from "@mui/material";

const InitialExpense: Expense = {
  id: "",
  conceptId: "",
  amount: 0,
  date: Date.now(),
  description: "",
};

export const OperatingPage = () => {
  const { expenses, loading } = useSelector(getExpenses);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchExpenses());
    dispatch(fetchExpenseConcepts());
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {loading || expenses.length === 0 ? (
        <Typography> CARGANDO... </Typography>
      ) : (
        <MainLayout>
          <ListLayout
            title="Gastos"
            list={expenses}
            initialDataItem={InitialExpense}
            header={Object.keys(expenses[0])?.filter((headItem) => headItem !== "id")}
            addItem={addExpense}
            updateItem={updateExpense}
            removeItem={removeExpense}
            loading={loading}
          />
        </MainLayout>
      )}
    </>
  );
};
