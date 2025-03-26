import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkApiConfig } from "../store";
import { BillService } from "./bills.service";
import { Bill } from "../../models/interfaces/Bill/IBill";

export const fetchBills = createAsyncThunk<Bill[]>("bills/fetchBills", () => BillService.fetchBills());

export const addBill = createAsyncThunk<Bill, Bill, ThunkApiConfig>("bills/addBill", (bill: Bill) =>
  BillService.addBill(bill)
);
export const removeBill = createAsyncThunk<string, string, ThunkApiConfig>("bills/removeBill", (billId: string) => {
  BillService.removeBill(billId);
  return billId;
});
export const updateBill = createAsyncThunk<Bill, Bill, ThunkApiConfig>("bills/updateBill", (bill: Bill) =>
  BillService.updateBill(bill)
);

export const setBills = createAsyncThunk<Bill[], Bill[], ThunkApiConfig>("bills/setBills", (bills: Bill[]) =>
  BillService.setBills(bills)
);
