import { fetchBills } from "./bills/bills.actions";
import { fetchClients } from "./clients/clients.actions";
import { fetchExpenseConcepts, fetchExpenses, fetchFees } from "./expenses/expenses.actions";
import { fetchLawyers } from "./lawyers/lawyers.actions";
import { fetchReceipts } from "./receipts/receipts.actions";
import { AppDispatch } from "./store";
import { fetchWorklogs } from "./worklogs/worklogs.actions";

export const fetchAllData = () => async (dispatch: AppDispatch) => {
  await Promise.all([
    dispatch(fetchExpenses()),
    dispatch(fetchExpenseConcepts()),
    dispatch(fetchFees()),
    dispatch(fetchClients()),
    dispatch(fetchLawyers()),
    dispatch(fetchWorklogs()),
    dispatch(fetchBills()),
    dispatch(fetchReceipts()),
  ]);
};
