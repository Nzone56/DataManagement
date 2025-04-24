import { fetchBills } from "./bills/bills.actions";
import { fetchClients } from "./clients/clients.actions";
import { fetchExpenseConcepts, fetchExpenses, fetchFees } from "./expenses/expenses.actions";
import { fetchLawyers } from "./lawyers/lawyers.actions";
import { fetchReceipts } from "./receipts/receipts.actions";
import { AppDispatch } from "./store";
import { fetchWorklogs } from "./worklogs/worklogs.actions";

export const fetchExpensesGraphs = () => async (dispatch: AppDispatch) => {
  await dispatch(fetchExpenses());
  await Promise.all([dispatch(fetchExpenseConcepts()), dispatch(fetchFees())]);
};

export const fetchLawyersGraphs = () => async (dispatch: AppDispatch) => {
  await dispatch(fetchLawyers());
  await dispatch(fetchWorklogs());
};

export const fetchClientsGraphs = () => async (dispatch: AppDispatch) => {
  await dispatch(fetchClients());
  await dispatch(fetchWorklogs());
};

export const fetchBillsReceiptsGraphs = () => async (dispatch: AppDispatch) => {
  await dispatch(fetchClients());
  await Promise.all([dispatch(fetchBills()), dispatch(fetchReceipts())]);
};
