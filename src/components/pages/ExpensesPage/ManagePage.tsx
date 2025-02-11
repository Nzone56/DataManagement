import { MainLayout } from "../../layouts/MainLayout";
import { ListLayout } from "../../layouts/ListLayout";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { AppDispatch } from "../../../store/store";
import { Expense, ExpenseWorklog } from "../../../models/interfaces/Expense/IExpense";
import { getExpenses } from "../../../store/expenses/expenses.selector";
import {
  addExpense,
  fetchExpenseConcepts,
  fetchExpenses,
  removeExpense,
  updateExpense,
} from "../../../store/expenses/expenses.actions";

const InitialExpense: Expense = {
  id: "",
  conceptId: "",
  amount: 0,
  date: Date.now(),
  description: "",
};

const ExpenseWorkLog: ExpenseWorklog[] = [
  {
    id: "",
    conceptId: "",
    amount: 0,
    date: Date.now(),
    description: "",
  },
];

export const ManagePage = () => {
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
        <span> CARGANDO... </span>
      ) : (
        <MainLayout>
          <ListLayout
            title="Gastos"
            list={expenses}
            initialDataItem={InitialExpense}
            data={ExpenseWorkLog}
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
