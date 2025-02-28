import { MainLayout } from "../../layouts/MainLayout";
import { ListLayout } from "../../layouts/ListLayout";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { getFees } from "../../../store/expenses/expenses.selector";
import { addFee, fetchFees, removeFee, updateFee } from "../../../store/expenses/expenses.actions";
import { AppDispatch } from "../../../store/store";
import { Fee } from "../../../models/interfaces/Expense/IExpense";
import { Typography } from "@mui/material";

const InitialFee: Fee = {
  id: "",
  feeConcept: "Carlos Bermúdez",
  amount: 0,
  date: Date.now(),
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
    <>
      {loading || fees.length === 0 ? (
        <Typography> CARGANDO... </Typography>
      ) : (
        <MainLayout>
          <ListLayout
            title="Honorarios"
            list={fees}
            initialDataItem={InitialFee}
            header={Object.keys(fees[0])?.filter((headItem) => headItem !== "id")}
            addItem={addFee}
            updateItem={updateFee}
            removeItem={removeFee}
            loading={loading}
          />
        </MainLayout>
      )}
    </>
  );
};
