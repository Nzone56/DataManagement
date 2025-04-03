import { MainLayout } from "../../layouts/MainLayout";
import { ListLayout } from "../../layouts/ListLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  addExpenseConcept,
  fetchExpenseConcepts,
  removeExpenseConcept,
  setExpensesConcepts,
  updateExpenseConcept,
} from "../../../store/expenses/expenses.actions";
import { useEffect } from "react";
import { AppDispatch } from "../../../store/store";
import { ExpenseConcept } from "../../../models/interfaces/Expense/IExpense";
import { getExpenseConcepts } from "../../../store/expenses/expenses.selector";
import { useTransformData } from "../../../hooks/useTransformData";

const InitialExpenseConcept: ExpenseConcept = {
  id: "",
  name: "",
  type: "",
  color: "",
  categories: [],
};

export const ConceptsPage = () => {
  const { expensesConcepts, loading } = useSelector(getExpenseConcepts);
  const dispatch = useDispatch<AppDispatch>();

  const { mapHeaderToConcept } = useTransformData();

  useEffect(() => {
    dispatch(fetchExpenseConcepts());
    //eslint-disable-next-line
  }, []);

  return (
    <MainLayout>
      <ListLayout
        title="Conceptos"
        list={expensesConcepts}
        initialDataItem={InitialExpenseConcept}
        header={Object.keys(InitialExpenseConcept)?.filter((headItem) => headItem !== "id")}
        addItem={addExpenseConcept}
        updateItem={updateExpenseConcept}
        removeItem={removeExpenseConcept}
        loading={loading}
        mapUpload={mapHeaderToConcept}
        setData={setExpensesConcepts}
      />
    </MainLayout>
  );
};
