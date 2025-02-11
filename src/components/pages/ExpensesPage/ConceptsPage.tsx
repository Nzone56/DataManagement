import { MainLayout } from "../../layouts/MainLayout";
import { ListLayout } from "../../layouts/ListLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  addExpenseConcept,
  fetchExpenseConcepts,
  removeExpenseConcept,
  updateExpenseConcept,
} from "../../../store/expenses/expenses.actions";
import { useEffect } from "react";
import { AppDispatch } from "../../../store/store";
import { ExpenseConcept, ExpenseConceptWorkLog } from "../../../models/interfaces/Expense/IExpense";
import { getExpenseConcepts } from "../../../store/expenses/expenses.selector";

const InitialExpenseConcept: ExpenseConcept = {
  id: "",
  name: "",
  type: "",
  color: "",
};

const ExpenseConceptWorkLogs: ExpenseConceptWorkLog[] = [
  {
    id: "",
    expensesConceptId: "",
    hoursWorked: 0,
    month: 0,
    year: 0,
  },
];

export const ConceptsPage = () => {
  const { expensesConcepts, loading } = useSelector(getExpenseConcepts);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchExpenseConcepts());
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {loading || expensesConcepts.length === 0 ? (
        <span> CARGANDO... </span>
      ) : (
        <MainLayout>
          <ListLayout
            title="Conceptos"
            list={expensesConcepts}
            initialDataItem={InitialExpenseConcept}
            data={ExpenseConceptWorkLogs}
            header={Object.keys(expensesConcepts[0])?.filter((headItem) => headItem !== "id")}
            addItem={addExpenseConcept}
            updateItem={updateExpenseConcept}
            removeItem={removeExpenseConcept}
            loading={loading}
          />
        </MainLayout>
      )}
    </>
  );
};
